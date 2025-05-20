import { baseApiSlice } from "./baseApiSlice";
import { ROOM_API_URL } from "../../constants";

export interface createRoomIpType {
  title?: string;
}

export interface createRoomOpType {
  title: string;
  joinCode: string;
}

export interface fetchJoinedRoomsOpType {
  rooms: {
    title: string;
    _id: string;
    joinCode: string;
  }[];
}

export interface verifyUserOpType {
  message: string;
  token?: string;
  expiersIn?: string;
}

export interface fetchRoomInfoOpType {
  roomInfo: {
    _id: string;
    title: string;
    participants: {
      _id: string;
      username: string;
    }[];
    joinCode: string;
  };
}

export const roomApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation<createRoomOpType, createRoomIpType>({
      query: (data) => ({
        url: `${ROOM_API_URL}/create`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Rooms"],
    }),

    fetchJoinedRooms: builder.query<fetchJoinedRoomsOpType, null>({
      query: () => ({
        url: `${ROOM_API_URL}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Rooms"],
      keepUnusedDataFor: 5,
    }),

    fetchRoomInfo: builder.query<fetchRoomInfoOpType, { roomId: string }>({
      query: (data) => ({
        url: `${ROOM_API_URL}/info/${data.roomId}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    joinRoom: builder.mutation<{ message: string }, { joinCode: string }>({
      query: (data) => ({
        url: `${ROOM_API_URL}/${data.joinCode}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Rooms"],
    }),

    verifyUser: builder.query<verifyUserOpType, { roomId: string }>({
      query: (data) => ({
        url: `${ROOM_API_URL}/verify/${data.roomId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useFetchJoinedRoomsQuery,
  useFetchRoomInfoQuery,
  useJoinRoomMutation,
  useVerifyUserQuery,
} = roomApiSlice;
