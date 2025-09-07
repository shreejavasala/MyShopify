import express from 'express'
const itemRouter = express.Router();
import upload from '../middlewares/upload.middleware.js'

import { 
  createItem, 
  deleteItem, 
  getItemById, 
  getItems, 
  updateItem
} from '../controllers/item.controller.js';
import verifyToken from '../middlewares/auth.middleware.js'

itemRouter.post("/", verifyToken, upload.single("image"),createItem);
itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id", verifyToken, upload.single("image"), updateItem)
itemRouter.delete("/:id", verifyToken, deleteItem);

export default itemRouter;