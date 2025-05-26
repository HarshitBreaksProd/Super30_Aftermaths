import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismaClient from "@workspace/db/client";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";

export async function fetchJoinedRooms() {
  const session = await getServerSession(authOptions);
  const userId = parseInt(session!.user.id!);

  if (!userId) {
    return {
      success: false,
      errorCode: 404,
      error: "User not signed in",
      joinedRooms: [],
    };
  }

  const getCachedJoinedRooms = unstable_cache(
    async (userId: number) => {
      try {
        const joinedRooms = await prismaClient.room.findMany({
          where: {
            users: {
              some: {
                id: userId,
              },
            },
          },
          select: {
            id: true,
            title: true,
            joinCode: true,
          },
        });

        return {
          success: true,
          joinedRooms,
        };
      } catch (e) {
        console.log(e);
        return {
          success: false,
          errorCode: 401,
          joinedRooms: [],
          error: "Could not fetch rooms",
        };
      }
    },
    [`user-${userId}-joinedRooms`],
    {
      tags: [`user-${userId}-rooms`],
      revalidate: 3600,
    }
  );

  return getCachedJoinedRooms(userId);
}

export async function fetchAllMessages(roomId: string) {
  const session = await getServerSession(authOptions);
  const userId = parseInt(session!.user.id!);

  if (!userId) {
    return {
      success: false,
      errorCode: 404,
      error: "User not signed in",
      messages: [],
    };
  }

  try {
    const messages = await prismaClient.message.findMany({
      where: {
        roomId: parseInt(roomId),
      },
      select: {
        user: true,
        roomId: true,
        content: true,
        userId: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      messages,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      errorCode: 401,
      messages: [],
      error: "Could not fetch messages",
    };
  }
}
