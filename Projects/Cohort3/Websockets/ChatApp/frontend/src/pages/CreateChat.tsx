import AppSidebar from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useCreateRoomMutation } from "@/store/services/roomApiSlice";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateChat = () => {
  const user: { userId: string; username: string } = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [createRoom] = useCreateRoomMutation();

  const createNewChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (title === "") {
        await createRoom({});
        toast.success("Room Created");
      } else {
        await createRoom({ title });
        toast.success("Room Created");
      }
    } catch (e) {
      console.log(e);
      toast.error("Could not create a new room");
    }
  };

  useEffect(() => {
    if (!user.userId) {
      navigate("/signin");
      return;
    }
  });
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full h-full">
        <div className="p-2">
          <SidebarTrigger className="text-2xl bg-black" />
        </div>
        <div className="w-full h-screen flex items-center justify-center">
          <Card className="min-w-80 max-w-96 w-96">
            <CardHeader>
              <CardTitle className="text-2xl">Create a new room</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => createNewChat(e)}>
                <div className="grid w-full items-center gap-4 mb-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Room Title</Label>
                    <Input
                      id="username"
                      placeholder="Enter room title"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      value={title}
                    />
                  </div>
                </div>
                <Button className="w-full cursor-pointer" type="submit">
                  Create Room
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CreateChat;
