import { Request, Response } from "express";
import prismaClient from "@repo/db/client";
import { random } from "../utils";

export async function createRoomController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const joinCode = random(6);

    if (!userId) {
      res.status(411).json({
        message: "User Id not found",
      });
      return;
    }

    const room = await prismaClient.room.create({
      data: {
        title: req.body?.title || `Room - ${joinCode}`,
        joinCode,
        user: {
          connect: { id: userId },
        },
        adminId: userId,
      },
    });

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error creating room",
    });
  }
}
