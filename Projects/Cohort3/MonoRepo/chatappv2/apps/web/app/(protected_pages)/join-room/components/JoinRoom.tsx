"use client";

import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { joinRoom } from "@/app/actions/user_actions";
import { useFormState, useFormStatus } from "react-dom";
import { handleJoinRoom, JoinRoomFormState } from "@/app/actions/room_actions";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const initialState: JoinRoomFormState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full cursor-pointer" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Joining Room...
        </>
      ) : (
        "Join Room"
      )}
    </Button>
  );
}

const JoinRoomForm = () => {
  const [state, formAction] = useFormState(handleJoinRoom, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="grid w-full items-center gap-4 mb-6">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="joinCode">Room Code</Label>
          <Input
            id="joinCode"
            name="joinCode"
            placeholder="Enter room title"
            required
            className={state.errors?.title ? "border-red-500" : ""}
          />
          {state.errors?.title && (
            <p className="text-sm text-red-500 mt-1">{state.errors.title}</p>
          )}
        </div>
      </div>
      <SubmitButton />
    </form>
  );
};

export default JoinRoomForm;
