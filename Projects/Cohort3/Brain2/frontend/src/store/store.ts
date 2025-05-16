import { configureStore } from "@reduxjs/toolkit";
import baseApiSlice from "./services/baseApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
