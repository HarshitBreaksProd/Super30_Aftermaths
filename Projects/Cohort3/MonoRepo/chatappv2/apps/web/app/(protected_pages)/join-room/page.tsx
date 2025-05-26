"use client";
import { joinRoom } from "@/app/actions/user_actions";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { Label } from "@workspace/ui/components/label";
import { toast } from "sonner";
import { useState } from "react";
import { redirect } from "next/navigation";

const JoinRoom = () => {
  const [joinCode, setJoinCode] = useState("");

  const joinNewRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (joinCode.length !== 6) {
      toast.error("Join Code consists of 6 characters");
      return;
    }
    const response = await joinRoom(joinCode);
    if (response.success) {
      toast.success("Room Joined");
      setJoinCode("");
      redirect(`/chat-room/${response.room!.id}`);
    } else {
      if (response.errorCode === 404) {
        toast.error("Please log in");
        redirect("/api/auth/signin");
      } else {
        toast.error(response.error);
      }
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full h-full">
        <div className="p-2">
          <SidebarTrigger className="text-2xl bg-black" />
        </div>
        <div className="w-full h-screen flex items-center justify-center">
          <Card className="min-w-80 max-w-96 w-96">
            <CardHeader>
              <CardTitle className="text-2xl">Enter the Room Code</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => joinNewRoom(e)}>
                <div className="grid w-full items-center gap-4 mb-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Room Code</Label>
                    <Input
                      id="username"
                      placeholder="Enter room title"
                      onChange={(e) => {
                        setJoinCode(e.target.value);
                      }}
                      value={joinCode}
                    />
                  </div>
                </div>
                <Button className="w-full cursor-pointer" type="submit">
                  Join Room
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default JoinRoom;
