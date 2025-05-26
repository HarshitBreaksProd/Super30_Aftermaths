"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarRoomsListProps {
  joinedRooms: {
    id: number;
    title: string;
    joinCode: string;
  }[];
}

const SidebarRoomsList = (porps: SidebarRoomsListProps) => {
  const pathname = usePathname();
  let activeChat = "";
  if (pathname.includes("chat-room")) {
    activeChat = pathname.split("/").pop() || "";
  }

  return (
    <SidebarMenu>
      {porps.joinedRooms?.map((room) => (
        <SidebarMenuItem key={room.id}>
          <SidebarMenuButton
            asChild
            isActive={room.id === parseInt(activeChat)}
          >
            <Link href={`/chat-room/${room.id}`}>
              <span className="text-base">{room.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarRoomsList;
