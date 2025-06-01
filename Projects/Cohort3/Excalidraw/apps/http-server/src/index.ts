import express from "express";
import authRouter from "./routes/authRouter";
import roomRouter from "./routes/roomRouter";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);

app.listen(3001);
