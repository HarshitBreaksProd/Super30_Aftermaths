import baseApiSlice from "./baseApiSlice";
import { BRAIN_API_URL } from "../../constants";

export interface sharedContentInterface {
  username: string;
  content: {
    _id: string;
    link: string;
    type: "youtube" | "tweet" | "spotify" | "link";
    title: string;
    tags: { _id: string; title: string }[];
    userId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const brainApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    enableShare: builder.mutation<{ message: string; hash: string }, null>({
      query: () => ({
        url: `${BRAIN_API_URL}/share`,
        method: "POST",
        credentials: "include",
        body: { share: true },
      }),
      invalidatesTags: ["ShareStatus"],
    }),

    disableShare: builder.mutation<{ message: string }, null>({
      query: () => ({
        url: `${BRAIN_API_URL}/share`,
        method: "POST",
        credentials: "include",
        body: { share: false },
      }),
      invalidatesTags: ["ShareStatus"],
    }),

    fetchShareBrainStatus: builder.query<
      { status: boolean; hash?: string },
      null
    >({
      query: () => ({
        url: `${BRAIN_API_URL}/share`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ShareStatus"],
      keepUnusedDataFor: 5,
    }),

    fetchSharedBrain: builder.query<sharedContentInterface, { hash: string }>({
      query: ({ hash }) => ({
        url: `${BRAIN_API_URL}/${hash}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useDisableShareMutation,
  useEnableShareMutation,
  useFetchShareBrainStatusQuery,
  useFetchSharedBrainQuery,
} = brainApiSlice;
