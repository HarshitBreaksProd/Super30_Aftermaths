import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  joinedRooms: {
    title: string;
    _id: string;
    joinCode: string;
  }[];
}

const initialState: AppState = {
  joinedRooms: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addRoom: (
      state,
      action: PayloadAction<{
        title: string;
        _id: string;
        joinCode: string;
      }>
    ) => {
      state.joinedRooms.push(action.payload);
    },

    setJoinedRooms: (
      state,
      action: PayloadAction<
        {
          title: string;
          _id: string;
          joinCode: string;
        }[]
      >
    ) => {
      state.joinedRooms = action.payload;
    },
  },
});

export const { addRoom, setJoinedRooms } = appSlice.actions;

export default appSlice.reducer;
