import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@workspace/db/client";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { message: "User not signed in" },
      { status: 401 }
    );
  }

  const roomId = (await params).roomId;

  try {
    const room = await prismaClient.room.findFirst({
      where: {
        id: parseInt(roomId),
      },
      select: {
        id: true,
        title: true,
        joinCode: true,
      },
    });
    return NextResponse.json({ room });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Ran into some error" },
      { status: 402 }
    );
  }

  return NextResponse.json({ roomId }, { status: 200 });
}
