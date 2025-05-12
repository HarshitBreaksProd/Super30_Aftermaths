import apiSlice from "./apiSlice";
import { CATEGORY_API_URL } from "../constants";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_API_URL}`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, data }) => ({
        url: `${CATEGORY_API_URL}/${categoryId}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: `${CATEGORY_API_URL}/${categoryId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),

    getCategory: builder.query({
      query: ({ categoryId }) => `${CATEGORY_API_URL}/${categoryId}`,
    }),

    listCategories: builder.query({
      query: () => `${CATEGORY_API_URL}/categories`,
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useListCategoriesQuery,
} = categoryApiSlice;
