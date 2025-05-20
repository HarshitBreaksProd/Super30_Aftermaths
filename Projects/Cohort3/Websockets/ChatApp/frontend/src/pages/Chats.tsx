import AppSidebar from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  useFetchRoomInfoQuery,
  useVerifyUserQuery,
} from "@/store/services/roomApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { AiOutlineInfoCircle, AiOutlineLoading } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea";
import {
  useFetchAllMessageQuery,
  useSendMessageMutation,
} from "@/store/services/messageApiSlice";
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

const Chats = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const user: { userId: string; username: string } = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const navigate = useNavigate();
  const wsRef = useRef<WebSocket>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [allMessages, setAllMessages] = useState<
    {
      content: string;
      userId: { _id: string; username: string };
      roomId: string;
      createdAt: string;
    }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const {
    data: roomInfo,
    isError,
    isLoading,
  } = useFetchRoomInfoQuery!({ roomId: roomId! });

  const { data: fetchedMessages } = useFetchAllMessageQuery({
    roomId: roomId!,
  });

  const { data: wsData } = useVerifyUserQuery({ roomId: roomId! });

  const [sendMessage] = useSendMessageMutation();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  useEffect(() => {
    if (fetchedMessages?.messages) {
      setAllMessages(fetchedMessages.messages);
    }
  }, [fetchedMessages]);

  useEffect(() => {
    if (!wsData?.token) return;

    const ws = new WebSocket(
      `${import.meta.env.VITE_WS_URL}?token=${wsData.token}`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      setAllMessages((prev) => [...prev, data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast.error("Connection error");
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event.code, event.reason);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      wsRef.current = null;
    };
  }, [wsData?.token]);

  const onSend = async () => {
    if (!newMessage.trim()) return;

    try {
      wsRef.current?.send(
        JSON.stringify({
          content: newMessage,
          roomId,
          userId: { _id: user.userId, username: user.username },
          createdAt: new Date().toISOString(),
        })
      );
      await sendMessage({ content: newMessage, roomId: roomId! });
      setNewMessage("");
    } catch (e) {
      console.log(e);
      toast.error("Error sending message");
      return;
    }
  };

  if (isError) {
    toast.error("Error fetching room info");
    navigate("/chats");
    return;
  }

  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="text-2xl bg-black" />
        <div className="w-full h-screen flex items-center justify-center">
          <AiOutlineLoading className="animate-spin" />
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider className="">
      <AppSidebar />
      <div className="flex flex-col w-full h-screen">
        <div className="p-2 flex items-center border-b">
          <SidebarTrigger className="text-2xl bg-primary text-black hover:bg-black hover:text-primary" />
          <div className="flex w-full items-center justify-between px-5">
            <h2 className="text-xl">{roomInfo?.roomInfo.title}</h2>
            <div>
              <Popover>
                <PopoverTrigger>
                  <AiOutlineInfoCircle size={20} />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex gap-2 items-center">
                    <Label>Join Code:</Label>
                    <p>{roomInfo?.roomInfo.joinCode}</p>
                    <Button
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          roomInfo!.roomInfo!.joinCode
                        );
                        toast.info("Code copied");
                      }}
                    >
                      <Copy />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div
          ref={chatContainerRef}
          className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4"
          style={{
            height: "calc(100vh - 180px)",
            scrollBehavior: "smooth",
          }}
        >
          {allMessages.map((message, index) => {
            const time = new Date(message.createdAt);
            return (
              <div
                key={index}
                className={`${
                  message.userId._id === user.userId
                    ? "self-end rounded-tr-none bg-primary"
                    : "rounded-tl-none bg-muted-foreground"
                } w-fit px-4 py-1 rounded-sm max-w-2/3 min-w-40 -space-y-1`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-neutral-800 text-base">
                    {message.userId.username}
                  </h3>
                  <p className="text-xs">
                    {time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="text-lg font-thin tracking-wide">
                  {message.content}
                </p>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex flex-col pb-4 bg-black pt-4 w-full h-fit items-center sticky bottom-0">
          <div className="flex items-center justify-center w-full gap-5">
            <Textarea
              placeholder="Type a message"
              className="w-11/12 resize-y h-fit max-h-60 no-scrollbar !text-base tracking-wide font-thin"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
            />
            <Button className="" onClick={onSend}>
              <AiOutlineSend />
            </Button>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Chats;
