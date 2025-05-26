import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import JoinRoomForm from "./components/JoinRoom";

const JoinRoom = () => {
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
              <JoinRoomForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default JoinRoom;
