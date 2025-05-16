import baseApiSlice from "./baseApiSlice";
import { TAGS_API_URL } from "../../constants";

export interface tag {
  _id: string;
  title: string;
}

export interface fetchTagResponse {
  tags: tag[];
}

const tagsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTagByKeyword: builder.query<fetchTagResponse, { keyword: string }>({
      query: ({ keyword }) => ({
        url: `${TAGS_API_URL}/${keyword}`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Tags"],
    }),

    fetchAllTags: builder.query<fetchTagResponse, null>({
      query: () => ({
        url: `${TAGS_API_URL}`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Tags"],
    }),

    createTag: builder.mutation<{ message: string }, { title: string }>({
      query: ({ title }) => ({
        url: `${TAGS_API_URL}`,
        method: "POST",
        credentials: "include",
        body: { title },
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const {
  useFetchTagByKeywordQuery,
  useFetchAllTagsQuery,
  useCreateTagMutation,
} = tagsApiSlice;
