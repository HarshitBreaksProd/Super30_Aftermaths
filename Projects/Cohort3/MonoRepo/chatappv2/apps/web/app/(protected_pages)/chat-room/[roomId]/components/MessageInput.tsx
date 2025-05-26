"use client";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { AiOutlineSend } from "react-icons/ai";
import { memo } from "react";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSend: () => void;
}

export const MessageInput = memo(function MessageInput({
  newMessage,
  setNewMessage,
  onSend,
}: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col pb-4 bg-black pt-4 w-full h-fit items-center sticky bottom-0">
      <div className="flex items-center justify-center w-full gap-5">
        <Textarea
          placeholder="Type a message"
          className="w-11/12 resize-y h-fit max-h-60 no-scrollbar !text-base tracking-wide font-thin"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={onSend}>
          <AiOutlineSend />
        </Button>
      </div>
    </div>
  );
});
