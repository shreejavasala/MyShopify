import React, { useContext, useEffect, useRef, useState } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";
import ItemCard from "../components/ItemCard.jsx";
import { categories as Categories } from "../../../backend/config/categories.js";
import Pagination from "../components/Pagination.jsx";
import { CartContext } from "../contexts/CartContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsContainerRef = useRef(null);
  const { addToCart } = useContext(CartContext);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchItems = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await api.get("/items", {
        params: { page: pageNum, limit: 9 },
      });
      setItems(response.data.data);
      setTotalPages(response.data.totalPages || 1);
      setPage(response.data.page || 1);
      const uniqueCats = Categories;
      setCategories(uniqueCats);
    } catch (error) {
      console.log(`Error in fetching items list: ${error}`);
      toast.error(`Failed to load items`);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async (pageNum = 1) => {
    setLoading(true);
    try {
      const params = { page: pageNum, limit: 9 };
      if (selectedCategory && selectedCategory !== "All") {
        params.category = selectedCategory;
      }
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await api.get("/items", { params });
      setItems(response.data.data);
      setTotalPages(response.data.totalPages || 1);
      setPage(response.data.page || 1);

      setTimeout(() => {
        itemsContainerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } catch (error) {
      console.log(`Error in applying filters ${error}`);
      toast.error("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (itemId) => {
    if (!token || !user) {
      toast.info("Please log in to add items to your cart");
      navigate("/login");
      return;
    }
    try {
      await addToCart(itemId, 1);
    } catch (error) {
      console.log(`Error adding to cart: ${error}`)
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen px-6 py-12">
      {/* Header */}
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-white mt-8">Shop Items</h2>
      </div>

      {/* Filters */}
      <div ref={itemsContainerRef} className="mx-auto w-full max-w-6xl mt-8 flex flex-col md:flex-row gap-4 justify-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md bg-white/5 px-3 py-2 text-sm text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="rounded-md bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="rounded-md bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
        />

        <button
          onClick={applyFilters}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Apply Filter
        </button>

        <button
          onClick={() => {
            setSelectedCategory("All");
            setMinPrice("");
            setMaxPrice("");
            fetchItems();
          }}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
        >
          Remove Filter
        </button>
      </div>
      
      {/* Items Grid */}
      <div className="mx-auto w-full max-w-6xl mt-10">
        {loading ? (
          <p className="text-center text-gray-400">Loading items...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400">No items found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                handleAddToCart={handleAddToCart}
                className="h-80 w-full" // increased height, full width of grid column
              />
            ))}
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} applyFilters={applyFilters} scrollTargetRef={itemsContainerRef} />
    </div>
  );
};

export default ItemsPage;
