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

    // get latest one by id
    getLatestNoteById: builder.query({
      query: (id) => ({
        url: `notes/get-a-note/${id}`,
        method: "GET",
      }),
    }),


    // update
    updateNoteById: builder.mutation({
      query: (id, data) => ({
        url: `notes/update/${id}`,
        method: "PATCH",
        body: data
      }),
    }),

  }),
});


