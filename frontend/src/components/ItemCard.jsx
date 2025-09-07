import React from "react";

const ItemCard = ({ item, handleAddToCart }) => {
  return (
    <div
      key={item._id}
      className="rounded-xl bg-white/5 p-4 shadow-md flex flex-col items-center"
    >
      <img
        src={item.image || "https://via.placeholder.com/150"}
        alt={item.name}
        className="w-45 h-45 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
      <p className="text-gray-300">₹{item.price}</p>
      <p className="text-sm text-gray-400 mb-2">{item.category}</p>
      <button
        onClick={() => handleAddToCart(item._id)}
        className="mt-2 w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ItemCard;
