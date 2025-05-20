import { Request, Response } from "express";
import { z } from "zod";
import { messageModel } from "../models";

export const addMessage = async (req: Request, res: Response) => {
  const inputValidator = z.object({
    content: z.string(),
    roomId: z.string(),
  });

  const reqBody = req.body;

  const isInputValid = inputValidator.safeParse(reqBody);

  if (!isInputValid.success) {
    console.log("Invalid Input:", isInputValid.error.errors[0].message);
    res.status(411).json({
      message: `Invalid inputs: ${isInputValid.error.errors[0].message}`,
    });
    return;
  }

  const messageInfo = isInputValid.data;

  try {
    if (!req.user?._id) {
      res.status(404).json({
        message: "Error fetching user id",
      });
      return;
    }
    const content = await messageModel.create({
      ...messageInfo,
      userId: req.user._id,
    });
    res.json({ message: "Message Sent" });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error sending message",
    });
    return;
  }
};

export const fetchMessages = async (req: Request, res: Response) => {
  const inputValidator = z.object({
    roomId: z.string(),
  });

  const roomId = req.params.roomId;

  const isInputValid = inputValidator.safeParse({ roomId });

  if (!isInputValid.success) {
    console.log("Invalid Input:", isInputValid.error.errors[0].message);
    res.status(411).json({
      message: `Invalid inputs: ${isInputValid.error.errors[0].message}`,
    });
    return;
  }

  const roomInfo = isInputValid.data;

  try {
    const messages = await messageModel
      .find({ roomId: roomInfo.roomId })
      .populate({ path: "userId", select: "-password" });
    res.json({ messages });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error fetching messages",
    });
    return;
  }
};
