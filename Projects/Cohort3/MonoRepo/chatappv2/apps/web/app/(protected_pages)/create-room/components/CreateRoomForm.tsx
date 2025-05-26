"use client";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { FormState, handleCreateRoom } from "@/app/actions/room_actions";

const initialState: FormState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full cursor-pointer" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Room...
        </>
      ) : (
        "Create Room"
      )}
    </Button>
  );
}

export function CreateRoomForm() {
  const [state, formAction] = useFormState(handleCreateRoom, initialState);

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
          <Label htmlFor="title">Room Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter room title"
            required
            maxLength={50}
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
}
