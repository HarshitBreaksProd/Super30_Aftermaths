"use client";
import { useEffect, useRef, memo } from "react";

interface FetchedMessage {
  user: { id: number; username: string; password: string };
  roomId: number;
  content: string;
  userId: number;
  createdAt: Date;
}

interface ChatMessagesProps {
  messages: FetchedMessage[];
  currentUserId: string;
}

export const ChatMessages = memo(function ChatMessages({
  messages,
  currentUserId,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4"
      style={{
        height: "calc(100vh - 180px)",
        scrollBehavior: "smooth",
      }}
    >
      {messages.map((message, index) => {
        const time = new Date(message.createdAt);
        const isCurrentUser = message.userId === parseInt(currentUserId);

        return (
          <div
            key={`${message.createdAt}-${index}`}
            className={`${
              isCurrentUser
                ? "self-end rounded-tr-none bg-primary"
                : "rounded-tl-none bg-muted-foreground"
            } w-fit px-4 py-1 rounded-sm max-w-2/3 min-w-40 -space-y-1`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-neutral-800 text-sm">
                {message.user.username}
              </h3>
              <p className="text-xs text-gray-700">
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
            <p className="text-lg tracking-wide text-black">
              {message.content}
            </p>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
});
