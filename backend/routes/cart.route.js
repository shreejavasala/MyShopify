import express from 'express'
import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from '../controllers/cart.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
const cartRouter = express.Router();

cartRouter.use(verifyToken)
cartRouter.post("/add", addToCart);
cartRouter.get("/", getCart)
cartRouter.put("/update", updateCartItem)
cartRouter.delete("/remove", removeFromCart);
cartRouter.delete("/clear", clearCart)


export default cartRouter;