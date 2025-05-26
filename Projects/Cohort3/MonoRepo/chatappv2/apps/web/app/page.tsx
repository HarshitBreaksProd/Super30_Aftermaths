import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Welcome! to the Chat App</h1>
        <Button>
          <Link href={"/create-room"}>Create Chat</Link>
        </Button>
      </div>
    </div>
  );
}
