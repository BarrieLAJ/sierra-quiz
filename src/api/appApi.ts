import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "questions",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.trivia.willfry.co.uk/" }),
  endpoints: () => ({}),
});
