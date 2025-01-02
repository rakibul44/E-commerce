import apiService from "../api-service/api-service";

export const scrollNoteApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // create a note
    createANote: builder.mutation({
      query: (data) => ({
        url: `notes/create-a-note`,
        method: "POST",
        body: data,
      }),
    }),

    // get note
    getALatestNote: builder.query({
      query: () => ({
        url: `notes/get-a-latest-note`,
        method: "GET",
      }),
    }),

  }),
});


