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
exports.signinController = exports.signupController = void 0;
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputValidator = zod_1.default.object({
        username: zod_1.default.string().min(3).max(20),
        password: zod_1.default.string().min(8),
    });
    const reqBody = req.body;
    const isInputValid = inputValidator.safeParse(reqBody);
    if (!isInputValid.success) {
        console.log("Invalid Input");
        res.status(411).json({
            message: "Invalid inputs",
        });
        return;
    }
    const userInfo = isInputValid.data;
    const saltrounds = parseInt(process.env.SALTROUNDS);
    try {
        const hashedPwd = yield bcrypt_1.default.hash(userInfo.password, saltrounds);
        try {
            const user = yield models_1.userModel.create({
                username: userInfo.username,
                password: hashedPwd,
            });
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.cookie("jwt", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                message: "User created successfully",
            });
            return;
        }
        catch (e) {
            console.log(e);
            if (e.errorResponse.code === 11000) {
                res.status(403).json({
                    message: "User already Exists",
                });
                return;
            }
            res.status(411).json({
                message: "Error creating new user",
            });
            return;
        }
    }
    catch (e) {
        console.log(e);
        res.status(411).json({
            message: "Error creating new user",
        });
        return;
    }
});
exports.signupController = signupController;
const signinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputValidator = zod_1.default.object({
        username: zod_1.default.string().min(3).max(20),
        password: zod_1.default.string().min(8),
    });
    const reqBody = req.body;
    const isInputValid = inputValidator.safeParse(reqBody);
    if (!isInputValid.success) {
        console.log("Invalid Input");
        res.status(411).json({
            message: "Invalid inputs",
        });
        return;
    }
    const userInfo = isInputValid.data;
    try {
        const user = yield models_1.userModel.findOne({ username: userInfo.username });
        if (!user) {
            console.log("User Not found");
            res.status(403).json({
                message: "User Not found",
            });
            return;
        }
        const userMatch = bcrypt_1.default.compareSync(userInfo.password, user === null || user === void 0 ? void 0 : user.password);
        if (!userMatch) {
            console.log("User Not found");
            res.status(403).json({
                message: "User Not found",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "User Logged in successfully",
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error",
        });
        return;
    }
});
exports.signinController = signinController;
