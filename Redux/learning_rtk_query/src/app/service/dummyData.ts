import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    // Get All Products (read)
    getAllProducts: builder.query({
      query: () => "/products",
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    addNewProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/products/add`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newProduct,
      }),
    }),

    updateProductById: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `/products/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedProduct,
      }),
    }),

    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
} = productsApi;
