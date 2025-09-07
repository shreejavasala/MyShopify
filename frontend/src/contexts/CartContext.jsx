import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(null);
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await api.get('/cart', { headers: { Authorization: `Bearer ${token}`} });
      setCart(response.data.data);
    } catch (error) {
      console.log(`Error fetching cart: ${error}`);
      // toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    try {
      const response = await api.post("/cart/add", { itemId, quantity }, { headers: { Authorization: `Bearer ${token}`} });
      setCart(response.data.data);
      toast.success("Item added to cart");
    } catch (error) {
      console.log(`error adding to cart: ${error}`);
      toast.error("Failed to add Item to cart");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete("/cart/remove", {
        headers: { Authorization: `Bearer ${token}` },
        data: { itemId },
      });
      setCart((prevCart) => ({
        prevCart,
        items: prevCart.items.filter((item) => item.itemId._id !== itemId),
        totalPrice: prevCart.items
          .filter((item) => item.itemId._id !== itemId)
          .reduce((total, item) => total + item.itemId.price * item.quantity, 0)
      }));

      toast.success("Item removed from cart");
    } catch (error) {
      console.log(`Error removing from cart: ${error}`);
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) return; //  quantity cannot be less than 1
      await api.put("/cart/update", { itemId, quantity: newQuantity });

      setCart((prevCart) => {
        const updatedItems = prevCart.items.map((item) =>
          item.itemId._id === itemId
          ? { ...item, quantity: newQuantity }
          : item
        ); 
        return {
          ...prevCart,
          items: updatedItems,
        };
      });

      toast.success("Cart updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cart");
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart/clear",{ headers: { Authorization: `Bearer ${token}` } });
      setCart({ items: [], totalPrice: 0 });
      toast.success("Cart cleared");
    } catch (error) {
      console.log(`Error clearing the cart: ${error}`);
      toast.error("Failed to clear cart");
    }
  };

  useEffect(() => {
    if(token) fetchCart();  
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


