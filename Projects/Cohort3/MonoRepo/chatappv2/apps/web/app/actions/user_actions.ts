"use server";
import prismaClient from "@workspace/db/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { random } from "@/lib/utils";
import { revalidateTag } from "next/cache";

export async function createUser(data: { username: string; password: string }) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    await prismaClient.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });
    return {
      message: "Signed Up",
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Error Faced",
    };
  }
}

export async function createRoom(title: string) {
  const joinCode = random(6);
  let roomTitle;
  if (title === "") {
    roomTitle = `Room - ${joinCode}`;
  } else {
    roomTitle = title;
  }

  const session = await getServerSession(authOptions);
  const userId = parseInt(session!.user.id);

  if (!userId) {
    return {
      success: false,
      errorCode: 404,
      error: "User not signed in",
    };
  }

  try {
    const newRoom = await prismaClient.room.create({
      data: {
        title: roomTitle,
        joinCode,
        users: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        joinCode: true,
        title: true,
        users: false,
      },
    });

    revalidateTag(`user-${userId}-rooms`);

    return {
      success: true,
      newRoom,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      errorCode: 401,
      error: "Could not create new room try again",
    };
  }
}

export async function joinRoom(joinCode: string) {
  if (joinCode.length !== 6) {
    return {
      success: false,
      errorCode: 401,
      error: "Join Code consists of 6 characters",
    };
  }

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      success: false,
      errorCode: 404,
      error: "User not signed in",
    };
  }
  const userId = parseInt(session.user.id);

  try {
    const room = await prismaClient.room.update({
      where: {
        joinCode: joinCode,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
    revalidateTag(`user-${userId}-rooms`);
    return {
      success: true,
      room,
    };
  } catch (e) {
    return {
      success: false,
      errorCode: 401,
      error: "Error Faced during update",
    };
  }
}
