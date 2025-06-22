"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    const db_url = process.env.DB_URL;
    if (!db_url) {
        console.log("DB_URL not Found");
        process.exit(1);
    }
    try {
        mongoose_1.default.connect(db_url);
        console.log("Connected to DB");
    }
    catch (e) {
        console.log("Error connecting to DB");
        console.error(e);
    }
};
exports.connectDb = connectDb;
