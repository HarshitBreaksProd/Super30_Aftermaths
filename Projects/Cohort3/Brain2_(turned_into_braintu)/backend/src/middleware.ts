import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "./models";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: { _id: Types.ObjectId; username: String };
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({
      message: "User not logged in.",
    });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "Login to access" });
      return;
    }
    req.user = { _id: user._id, username: user.username };
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Invalid Jwt Token: Something Went Wrong" });
  }
};
