"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../generated/prisma");
const app = (0, express_1.default)();
const prismaClient = new prisma_1.PrismaClient();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prismaClient.user.findMany();
    res.json({
        data,
    });
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient.user.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString(),
        },
    });
    res.json({
        message: "post endpoint",
    });
}));
app.listen(3000);
