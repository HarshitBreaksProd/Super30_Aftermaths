import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ChatRoom } from "./components/ChatRoom";
import prismaClient from "@workspace/db/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchAllMessages } from "@/lib/data/rooms";

interface PageProps {
  params: Promise<{ roomId: string }>;
}

export default async function ChatRoomPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const userId = parseInt(session.user.id);
  const { roomId } = await params;

  let roomInfo = null;
  try {
    roomInfo = await prismaClient.room.findFirst({
      where: {
        id: parseInt(roomId),
        users: {
          some: { id: userId },
        },
      },
      select: {
        id: true,
        title: true,
        joinCode: true,
      },
    });
  } catch (error) {
    console.error("Error fetching room:", error);
    redirect("/join-room");
  }
  if (!roomInfo) {
    redirect("/join-room");
  }

  const fetchMessageResponse = await fetchAllMessages(roomId);

  if (fetchMessageResponse.success === false) {
    console.log("Error occured when fetching messages");
    return <div>Could not fetch messages! Please retry</div>;
  }

  return (
    <ChatRoom
      roomInfo={roomInfo}
      user={session.user}
      roomId={roomId}
      messages={fetchMessageResponse.messages}
    />
  );
}
