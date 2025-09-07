import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'

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

app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Starting the server...`);
  console.log(`Server is running on PORT: http://localhost:${PORT}`);
});