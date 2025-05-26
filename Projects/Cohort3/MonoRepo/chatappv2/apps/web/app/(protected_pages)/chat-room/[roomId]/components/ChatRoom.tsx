"use client";
import { Button } from "@workspace/ui/components/button";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { toast } from "sonner";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Label } from "@workspace/ui/components/label";
import { Copy } from "lucide-react";
import { ChatMessages } from "./ChatMessages";
import { MessageInput } from "./MessageInput";

interface ChatRoomProps {
  roomInfo: {
    id: number;
    title: string;
    joinCode: string;
  };
  user: { id: string; username?: string };
  roomId: string;
  messages: FetchedMessage[];
}

interface FetchedMessage {
  user: { id: number; username: string; password: string };
  roomId: number;
  content: string;
  userId: number;
  createdAt: Date;
}

export function ChatRoom({ roomInfo, user, roomId, messages }: ChatRoomProps) {
  const wsRef = useRef<WebSocket | null>(null);
  const [allMessages, setAllMessages] = useState<FetchedMessage[]>(messages);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    console.log("Connection made");
    const ws = new WebSocket(`ws://localhost:8080`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          userId: user.id,
          roomId,
        })
      );
    };

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      setAllMessages((prev) => [...prev, data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      // toast.error("Connection error");
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event.code, event.reason);
    };

    return () => {
      console.log("Connection closed");
      ws.close();
    };
  }, []);

  const onSend = async () => {
    if (!newMessage.trim()) return;

    try {
      wsRef.current?.send(
        JSON.stringify({
          content: newMessage,
          roomId: roomId,
          userId: user.id,
          user: { id: user.id, username: user.username },
          createdAt: new Date().toISOString(),
        })
      );
      setNewMessage("");
    } catch (e) {
      console.log(e);
      toast.error("Error sending message");
    }
  };

  const handleCopyJoinCode = () => {
    navigator.clipboard.writeText(roomInfo.joinCode);
    toast.info("Join code copied!");
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="p-2 flex items-center border-b">
        <SidebarTrigger className="text-2xl bg-primary text-black hover:bg-black hover:text-primary" />
        <div className="flex w-full items-center justify-between px-5">
          <h2 className="text-xl">{roomInfo.title}</h2>
          <div className="cursor-pointer">
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                <AiOutlineInfoCircle size={20} />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex gap-2">
                    <Label>Join Code:</Label>
                    <p className="font-mono">{roomInfo.joinCode}</p>
                  </div>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={handleCopyJoinCode}
                  >
                    <Copy />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <ChatMessages messages={allMessages} currentUserId={user.id} />

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSend={onSend}
      />
    </div>
  );
}
