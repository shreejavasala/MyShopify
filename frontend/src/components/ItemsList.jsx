import React, { useEffect, useState } from 'react'
import api from '../api/axios';
import { toast } from 'react-toastify';
import ItemCard from './ItemCard';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = {};
      if(selectedCategory && selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if(maxPrice) {
        params.maxPrice = maxPrice;
      }
      if(minPrice) {
        params.minPrice = minPrice;
      }

      const response = await api.get('/items', { params });
      setItems(response.data.data);

      const uniqueCats = [
        'All',
        ...new Set(( response.data.data || []).map(i => i.category)),
      ];
      setCategories(uniqueCats);
    } catch (error) {
      console.log(error);
      toast.error(`Falied to load items`);
    } finally {
      setLoading(false);
    }
  }

  const addToCart = async (itemId) => {
    try {
      await api.post('/cart', { itemId, quantity: 1 });
      toast.success(`Item added to cart!`);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to add item`);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [selectedCategory, maxPrice, minPrice]);

  return (
    <div className="flex min-h-screen flex-col px-6 py-12 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Shop Items
        </h2>
      </div>

      {/* Filters */}
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl mt-8 flex flex-col md:flex-row gap-4 justify-center">
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
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="rounded-md bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
        />
      </div>

      {/* Items */}
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl mt-10">
        {loading ? (
          <p className="text-center text-gray-400">Loading items...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400">No items found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} addToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemsList