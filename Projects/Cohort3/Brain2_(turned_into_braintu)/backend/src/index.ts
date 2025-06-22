import express from "express";
import { connectDb } from "./db";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes";
import contentRouter from "./routes/contentRoutes";
import brainRouter from "./routes/brainRoutes";
import tagsRouter from "./routes/tagsRoutes";
import { authenticateUser } from "./middleware";
require("dotenv").config();

connectDb();
const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/content", authenticateUser, contentRouter);
app.use("/api/v1/brain", authenticateUser, brainRouter);

app.listen(process.env.PORT, () =>
  console.log(`Listening at port: ${process.env.PORT}`)
);
