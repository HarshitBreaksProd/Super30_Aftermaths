import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CreateRoomForm } from "./components/CreateRoomForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CreateRoomPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
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
            <CreateRoomForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
