import { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models";

export const signupController = async (req: Request, res: Response) => {
  const inputValidator = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8),
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
  const saltrounds = parseInt(process.env.SALTROUNDS!);

  try {
    const hashedPwd = await bcrypt.hash(userInfo.password, saltrounds);
    try {
      const user = await userModel.create({
        username: userInfo.username,
        password: hashedPwd,
      });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "User created successfully",
        userId: user._id,
      });
      return;
    } catch (e: any) {
      console.log(e);
      if (e!.errorResponse!.code === 11000) {
        res.status(403).json({
          message: "Username already in use",
        });
        return;
      }
      res.status(411).json({
        message: "Error creating new user",
      });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error creating new user",
    });
    return;
  }
};

export const signinController = async (req: Request, res: Response) => {
  const inputValidator = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8),
  });

  const reqBody = req.body

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
    const user = await userModel.findOne({ username: userInfo.username });
    if (!user) {
      console.log("User Not found");
      res.status(403).json({
        message: "User Not found",
      });
      return;
    }
    const userMatch = bcrypt.compareSync(userInfo.password, user?.password!);
    if (!userMatch) {
      console.log("Incorrect Password");
      res.status(403).json({
        message: "Incorrect Password",
      });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User Logged In successfully",
      userId: user._id,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};

export const signoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "User logged out successfully",
    });
    return;
  } catch (e: any) {
    console.log(e);
    res.status(411).json({
      message: "Error clearing cookie",
    });
    return;
  }
};
