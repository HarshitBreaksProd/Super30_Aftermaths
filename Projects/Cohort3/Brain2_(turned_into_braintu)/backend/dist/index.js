"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
require("dotenv").config();
(0, db_1.connectDb)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/auth", authRoutes_1.default);
app.listen(process.env.PORT, () => console.log(`Listening at port: ${process.env.PORT}`));
