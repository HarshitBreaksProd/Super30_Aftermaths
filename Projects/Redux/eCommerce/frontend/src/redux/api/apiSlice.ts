import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../constants";

const apiSlice = createApi({
  tagTypes: ["Product", "Order", "User", "Category"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: () => ({}),
});

export default apiSlice;
