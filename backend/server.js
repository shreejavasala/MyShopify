import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

import connectDB from './config/dbConn.js';
import authRouter from './routes/auth.route.js';
import itemRouter from './routes/item.route.js';
import cartRouter from './routes/cart.route.js';
import { allowedOrigins } from './config/allowedOrigins.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/cart", cartRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
