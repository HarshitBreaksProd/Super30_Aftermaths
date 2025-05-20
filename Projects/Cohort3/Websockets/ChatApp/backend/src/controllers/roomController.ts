import { Request, Response } from "express";
import z from "zod";
import { roomModel } from "../models";
import { random } from "../utils";
import jwt from "jsonwebtoken";

export const createRoom = async (req: Request, res: Response) => {
  console.log(req.body);
  const inputValidator = z
    .object({
      title: z.string(),
    })
    .optional();

  const reqBody = req.body;
  const isInputValid = inputValidator.safeParse(reqBody);

  if (!isInputValid.success) {
    console.log("Invalid Input");
    res.status(411).json({
      message: "Invalid inputs",
    });
    return;
  }

  const roomInfo = isInputValid.data;

  const createUniqueJoinCode = async () => {
    const randomRoomNo = random(6);
    console.log(randomRoomNo);
    const existingRoom = await roomModel.findOne({ joinCode: randomRoomNo });
    while (existingRoom) {
      return createUniqueJoinCode();
    }
    return randomRoomNo;
  };

  try {
    const uniqueJoinCode = await createUniqueJoinCode();
    const room = await roomModel.create({
      title: `${roomInfo?.title}` || `Room - ${uniqueJoinCode}`,
      joinCode: uniqueJoinCode,
      participants: [req.user?._id],
    });
    res.json({ message: "New Room Added", roomJoinCode: room.joinCode });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error creating new room",
    });
    return;
  }
};

export const fetchParticipatedRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await roomModel
      .find({
        participants: { $in: [req.user?._id] },
      })
      .select(["title", "joinCode"]);
    res.json({ rooms });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error fetching Rooms",
    });
    return;
  }
};

export const fetchRoomInfoById = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;

  try {
    const roomInfo = await roomModel
      .findOne({
        _id: roomId,
      })
      .populate({ path: "participants", select: "-password" });
    res.json({ roomInfo });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error fetching Rooms",
    });
    return;
  }
};

export const joinRoom = async (req: Request, res: Response) => {
  const joinCode = req.params.joinCode;

  try {
    const room = await roomModel.findOne({ joinCode });
    if (!room) {
      res.status(404).json({
        message: "Room with the given code does not exist",
      });
      return;
    }
    if (!req.user?._id) {
      res.status(404).json({
        message: "Error fetching user id",
      });
      return;
    }
    room.participants.push(req.user._id);
    await room.save();
    res.json({
      message: "Room Joined Successfully",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error fetching Tags",
    });
    return;
  }
};

export const userVerification = async (req: Request, res: Response) => {
  const inputValidator = z.object({
    roomId: z.string(),
  });

  const roomId = req.params.roomId;
  const isInputValid = inputValidator.safeParse({ roomId });

  if (!isInputValid.success) {
    console.log("Invalid Input");
    res.status(411).json({
      message: "Invalid inputs",
    });
    return;
  }

  const userId = req.user?._id;

  if (!userId) {
    res.status(404).json({
      message: "Error finding user",
    });
    return;
  }

  try {
    const room = await roomModel.findOne({
      _id: roomId,
      participants: { $in: [userId] },
    });
    if (!room) {
      res.status(404).json({
        message: "User not a member",
      });
      return;
    }

    const token = jwt.sign(
      {
        roomId,
        userId,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30s" }
    );

    res.json({
      message: "User Verified",
      token,
      expiresIn: 30,
    });
    return;
  } catch (e) {
    res.status(411).json({
      message: "Faced some issues verifying",
    });
    return;
  }
};
