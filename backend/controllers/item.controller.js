import Item from "../models/item.model.js";
import cloudinary from "../config/cloudinary.js";

export const createItem = async (req, res) => {
  // verify request
  const { name, price, category, quantity, description } = req.body;

  const file = req.file;
  if(!name?.trim() || price == null || !category?.trim() || quantity == null) {
    return res.status(400).json({ success: false, message: "Name, Price, Category and Quantity are required" });
  } 
  try {

    // check if item already exists
    const duplicateItem = await Item.findOne({ name: name.trim(), category: category });
    if(duplicateItem) {
      return res.status(409).json({ success: false, message: `Item ${name} already exists in category ${category}` });
    } 

    let imageURL = "https://via.placeholder.com/150"; // default image

    if(file) {
      // upload to Cloudinary
      imageURL = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "items" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });
    }

    // create new Item
    const newItem = await Item.create({
      name, 
      price,
      category,
      quantity,
      description: description?.trim(),
      image: imageURL
    });

    if(!newItem) {
      return res.status(400).json({ success: false, message: `Error creating new Item`});
    }

    res.status(201).json({ 
      success: true, 
      message: `${newItem.name} created successfully`,
      data: newItem 
    });
  } catch (error) {
    console.log(`Error creating new Item: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}

export const getItems = async (req, res) => {
  const { category, minPrice, maxPrice, page = 1, limit = 10} = req.query;

  // create a filter object
  let filter = {};
  try {
    if(category && category !== 'All') {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice !== undefined && minPrice !== "") {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && maxPrice !== "") {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // pagination
    const skip =(Number(page - 1)) * Number(limit);

    // filter relevant items
    const items = await Item.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }) // newest comes first

    const totalItems = await Item.countDocuments(filter);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(totalItems / Number(limit)),
      totalItems: totalItems,
      data: items
    });
  } catch (error) {
    console.error(`Error fetching items: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}

export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if(!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.log(`Error fetching the item by ID: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, quantity, description, image } = req.body;

  try {
    const item = await Item.findById(id);
    if(!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    if(name) item.name = name.trim();
    if(price != null) item.price = Number(price);
    if(category) item.category = category;
    if(quantity != null) item.quantity = Number(quantity);
    if(description != null) item.description = description.trim();
    if(image) item.image = image;

    await item.save();

    res.status(200).json({ 
      success: true,
      message: `${item.name} updated successfully`,
      data: item 
    });
  } catch (error) {
    console.log(`Error updating item: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if(!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    await item.deleteOne();

    res.status(200).json({ success: true, message: `${item.name} deleted successfully` });
  } catch (error) {
    console.log(`Error deleting the item: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}