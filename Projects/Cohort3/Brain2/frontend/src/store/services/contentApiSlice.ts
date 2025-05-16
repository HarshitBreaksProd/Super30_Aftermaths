import baseApiSlice from "./baseApiSlice";
import { CONTENT_API_URL } from "../../constants";

export interface contentInterface {
  userContent: {
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

export interface createContentInterface {
  type: string;
  link: string;
  title: string;
  tags: string[];
}

const contentApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContent: builder.mutation<
      { message: string },
      createContentInterface
    >({
      query: (contentDetails) => ({
        url: `${CONTENT_API_URL}`,
        method: "POST",
        body: contentDetails,
        credentials: "include",
      }),
      invalidatesTags: ["Content"],
    }),

    fetchAllContent: builder.query<contentInterface, null>({
      query: () => ({
        url: `${CONTENT_API_URL}`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Content"],
    }),

    deleteContentById: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `${CONTENT_API_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const {
  useCreateContentMutation,
  useFetchAllContentQuery,
  useDeleteContentByIdMutation,
} = contentApiSlice;
