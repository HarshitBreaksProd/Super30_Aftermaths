import { Request, Response } from "express";
import prismaClient from "@repo/db/client";

export async function fetchAllChatMessages(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "User Id not found",
    });
    return;
  }

  const { roomId } = req.params;
  try {
    const userExists = await prismaClient.room.findFirst({
      where: {
        id: roomId,
        user: {
          some: { id: userId },
        },
      },
      select: {
        id: true,
        title: true,
        joinCode: true,
      },
    });

    if (!userExists?.id) {
      res.status(401).json({
        message: "User not part of the room",
      });
      return;
    }

    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      take: 25,
      orderBy: {
        serialNumber: "desc",
      },
    });

    res.json({
      messages,
    });
  } catch (e) {
    console.log(e);
    res.status(401).json({
      message: "Could not fetch messages",
    });
  }
}
