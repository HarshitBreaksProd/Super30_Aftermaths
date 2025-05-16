import baseApiSlice from "./baseApiSlice";
import { AUTH_API_URL } from "../../constants";

export interface authInterface {
  username: string;
  password: string;
}

const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<
      { message: string; userId: string },
      authInterface
    >({
      query: (data) => ({
        url: `${AUTH_API_URL}/signup`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    signin: builder.mutation<
      { message: string; userId: string },
      authInterface
    >({
      query: (data) => ({
        url: `${AUTH_API_URL}/signin`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    signout: builder.mutation<{ message: string; userId: string }, null>({
      query: () => ({
        url: `${AUTH_API_URL}/signout`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useSignoutMutation } =
  authApiSlice;
