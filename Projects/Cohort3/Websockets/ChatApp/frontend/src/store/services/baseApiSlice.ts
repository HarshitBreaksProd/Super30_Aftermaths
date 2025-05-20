import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
  tagTypes: ["Rooms"],
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.BASE_API_URL}` }),
  endpoints: () => ({}),
});
