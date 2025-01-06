
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiService = createApi({
     reducerPath: "api",
     baseQuery: fetchBaseQuery({
      // localhost
        baseUrl: "http://localhost:5001/api/v1/"
     // baseUrl: 'https://elan-server.vercel.app/api/v1/'
     }),
     endpoints: () => ({}),
});

export default apiService