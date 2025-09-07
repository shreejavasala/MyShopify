import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";

const CartPage = () => {
  const { loading, cart, fetchCart, removeFromCart, clearCart, updateQuantity } =
    useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  const handleCheckout = () => {
    toast.info("Checkout feature is not implemented. This is a Demo button!");
  };

  const totalPrice = cart?.items?.reduce(
    (total, item) => total + (item.itemId.price || 0) * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-white mb-4">
          Your Cart is Empty
        </h2>
        <Link
          to="/items"
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
        >
          Shop Items
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-white mb-6 mt-8">Your Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cart.items.map((cartItem, index) => (
          <div
            key={`${cartItem.itemId._id} - ${index}}`}
            className="flex items-center bg-gray-800 p-4 rounded-md shadow-md"
          >
            <img
              src={cartItem.itemId.image || "https://via.placeholder.com/150"}
              alt={cartItem.itemId.name}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold">
                {cartItem.itemId.name}
              </h3>
              <p className="text-gray-400">Price: ${cartItem.itemId.price}</p>

              <div className="flex items-center mt-2 space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(cartItem.itemId._id, cartItem.quantity - 1)
                  }
                  className="bg-gray-600 px-2 py-1 rounded-md text-white hover:bg-gray-500"
                >
                  -
                </button>
                <span className="text-white">{cartItem.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(cartItem.itemId._id, cartItem.quantity + 1)
                  }
                  className="bg-gray-600 px-2 py-1 rounded-md text-white hover:bg-gray-500"
                >
                  +
                </button>
              </div>

              <p className="text-gray-400">
                Subtotal: ${cartItem.itemId.price * cartItem.quantity}
              </p>
              <button
                onClick={() => handleRemove(cartItem.itemId._id)}
                className="mt-2 bg-red-600 px-3 py-1 text-white rounded-md hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <button
            onClick={handleClearCart}
            className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-500 mr-4 cursor-pointer"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-indigo-600 px-4 py-2 text-white rounded-md hover:bg-indigo-500 mr-4 cursor-pointer"
          >
            Checkout
          </button>
        </div>
        <div className="text-white font-bold text-lg">Total: ${totalPrice}</div>
      </div>
    </div>
  );
};

export default CartPage;
