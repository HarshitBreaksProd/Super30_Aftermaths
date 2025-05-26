import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import SidebarRoomsList from "./sidebar-rooms-list";
import { Button } from "@workspace/ui/components/button";
import { fetchJoinedRooms } from "@/lib/data/rooms";

const AppSidebar = async () => {
  const joinedRooms = await fetchJoinedRooms();

  if (joinedRooms.error) {
    if (joinedRooms.errorCode === 404) {
      toast.error(joinedRooms.error);
      redirect("/api/auth/signin");
    } else {
      console.log(joinedRooms.error);
      toast.info(joinedRooms.error);
    }
  }

  return (
    <Sidebar>
      <div className="w-full p-4">
        <Link href={"/create-room"} className="text-2xl text-primary">
          Chat.app
        </Link>
      </div>
      <SidebarContent className="no-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarRoomsList joinedRooms={joinedRooms.joinedRooms} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <Button className="p-0">
          <Link
            href={"/join-room"}
            className="w-full h-full flex items-center justify-center"
          >
            Join Room
          </Link>
        </Button>
        <Button variant={"secondary"} className="p-0">
          <Link
            href={"/api/auth/signout"}
            className="w-full h-full flex items-center justify-center"
          >
            Logout
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
