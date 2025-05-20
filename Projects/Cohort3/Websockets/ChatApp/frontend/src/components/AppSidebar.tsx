import { useSignoutMutation } from "@/store/services/authApiSlice";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useFetchJoinedRoomsQuery } from "@/store/services/roomApiSlice";
import { Link, useNavigate } from "react-router-dom";

const AppSidebar = () => {
  const { data: joinedRooms } = useFetchJoinedRoomsQuery(null);
  const [logout] = useSignoutMutation();
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="w-full p-4">
        <Link to={"/"} className="text-2xl text-primary">
          Chat.app
        </Link>
      </div>
      <SidebarContent className="no-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {joinedRooms?.rooms?.map((room) => (
                <SidebarMenuItem key={room._id}>
                  <SidebarMenuButton asChild>
                    <a
                      href={`${import.meta.env.VITE_FRONTEND_URL}/chats/${
                        room._id
                      }`}
                    >
                      <span className="text-base">{room.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <Button
          onClick={async () => {
            navigate("/join");
          }}
        >
          Join Room
        </Button>
        <Button
          onClick={async () => {
            localStorage.clear();
            await logout(null);
            navigate("/signin");
          }}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
