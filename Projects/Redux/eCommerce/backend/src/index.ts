import path from "path";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "../routes/userRoutes";
import categoryRoutes from "../routes/categoryRoutes";
import productRoutes from "../routes/productRoutes";
import uploadRoutes from "../routes/uploadRoutes";

import { connectDB } from "../config/db";

dotenv.config();
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

const _dirname = path.resolve();
app.use("/uploads", express.static(path.join(_dirname + "/uploads")));

app.listen(port, () => {
  console.log(`Connected to PORT: ${port}`);
});
