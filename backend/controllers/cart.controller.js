import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { itemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if(!cart) {
      // if cart doesn't exist, create one
      cart = new Cart({ userId, items: [{ itemId, quantity }] });
    }else {
      // check if the item already exists
      const existingItem = cart.items.find(i => i.itemId.toString() === itemId);
      if(existingItem) {
        existingItem.quantity += Number(quantity); // increase quantity;
      }else {
        cart.items.push({ itemId, quantity: Number(quantity) || 1 }); // push new item
      }
    }

    await cart.save();
    res.status(201).json({
      success: true,
      message: "Item added to cart successfully", 
      data: cart 
    });
  } catch (error) {
    console.log(`Error adding to cart: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}

export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if(!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(i => i.itemId.toString() !== itemId);

    await cart.save();
    res.status(200).json({ 
      success: true, 
      message: "Item removed successfully from the cart", 
      data: cart 
    });
  } catch (error) {
    console.log(`Error removing item from cart: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}

export const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { itemId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const item = cart.items.find(i => i.itemId.toString() === itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found in cart" });

    item.quantity = Number(quantity);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.itemId");
    if(!cart || cart.items.length === 0) {
      const items = []
      return res.status(404).json({ success: false, message: "Cart is empty", data: { items: [], totalPrice: 0 }});
    }

    cart.items = cart.items.filter(ci => ci.itemId !== null);

    const totalPrice = cart.items.reduce((sum, cartItem) => {
      return sum + cartItem.itemId.price * cartItem.quantity;
    }, 0);

    res.status(200).json({ success: true, data: { items: cart.items, totalPrice } });
  } catch (error) {
    console.log(`Error fetching the cart data: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}

export const clearCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });
    if(!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.status(200).json({ success: true, message: "Cart is cleared", data: cart });
  } catch (error) {
    console.error(`Error clearing the cart: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}