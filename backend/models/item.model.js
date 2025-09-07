import mongoose from 'mongoose'
import { categories } from '../config/categories.js';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: categories,
    default: "All"
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150" //default image source
  },
  description: {
    type: String, 
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
export default Item;