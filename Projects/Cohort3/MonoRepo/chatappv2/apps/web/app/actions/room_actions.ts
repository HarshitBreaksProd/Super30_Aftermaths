"use server";

import { redirect } from "next/navigation";
import { createRoom, joinRoom } from "./user_actions";

export type CreateRoomFormState = {
  success: boolean;
  message?: string;
  errors?: {
    title?: string;
  };
};

export async function handleCreateRoom(
  prevState: CreateRoomFormState,
  formData: FormData
): Promise<CreateRoomFormState> {
  const title = formData.get("title") as string;

  if (!title || title.trim().length === 0) {
    return {
      success: false,
      errors: {
        title: "Room title is required",
      },
    };
  }

  if (title.length > 50) {
    return {
      success: false,
      errors: {
        title: "Room title must be less than 50 characters",
      },
    };
  }

  let response;
  try {
    response = await createRoom(title.trim());
  } catch (error) {
    console.error("Create room error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }

  if (!response.success || !response.newRoom) {
    return {
      success: false,
      message: response.error || "Failed to create room",
    };
  }

  redirect(`/chat-room/${response.newRoom.id}`);
}

export type JoinRoomFormState = {
  success: boolean;
  message?: string;
  errors?: {
    title?: string;
  };
};

export async function handleJoinRoom(
  prevState: JoinRoomFormState,
  formData: FormData
): Promise<JoinRoomFormState> {
  const joinCode = formData.get("joinCode") as string;

  if (!joinCode || joinCode.trim().length !== 6) {
    return {
      success: false,
      errors: {
        title: "Room joinCode consists of 6 characters",
      },
    };
  }

  let response;
  try {
    response = await joinRoom(joinCode.trim());
  } catch (error) {
    console.error("Create room error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }

  if (!response.success || !response.room) {
    return {
      success: false,
      message: response.error || "Failed to create room",
    };
  }

  redirect(`/chat-room/${response.room.id}`);
}
