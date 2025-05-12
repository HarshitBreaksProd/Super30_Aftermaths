import apiSlice from "./apiSlice";
import { USER_API_URL } from "../constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_API_URL}/auth`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_API_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USER_API_URL}/`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_API_URL}/profile`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: `${USER_API_URL}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USER_API_URL}/${userId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USER_API_URL}/${userId}`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `${USER_API_URL}/${data.userId}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useUpdateUserDetailsMutation,
} = userApiSlice;
