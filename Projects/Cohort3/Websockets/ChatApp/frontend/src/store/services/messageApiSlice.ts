import { baseApiSlice } from "./baseApiSlice";
import { MESSAGE_API_URL } from "../../constants";

export interface createMessageIpType {
  content: string;
  roomId: string;
}

export interface createMessageOpType {
  message: string;
}

export interface fetchAllMessagesOpType {
  messages: {
    _id: string;
    content: string;
    userId: {
      _id: string;
      username: string;
    };
    roomId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export const messageApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<createMessageOpType, createMessageIpType>({
      query: (data) => ({
        url: `${MESSAGE_API_URL}/`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    fetchAllMessage: builder.query<fetchAllMessagesOpType, { roomId: string }>({
      query: (data) => ({
        url: `${MESSAGE_API_URL}/${data.roomId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSendMessageMutation, useFetchAllMessageQuery } =
  messageApiSlice;
