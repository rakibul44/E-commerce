import apiService from "../api-service/api-service";

export const footerApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // Create a footer
    createFooter: builder.mutation({
      query: (formData) => ({
        url: `footer/create-footer?locationFolder=footer-images`,
        method: "POST",
        body: formData,
      }),
    }),

    // Get footer by id
    getFooterById: builder.query({
      query: (id) => ({
        url: `/footer/${id}`,
      }),
    }),

    // Update footer without logo
    updateFooter: builder.mutation({
      query: ({ id, formData }) => ({
        url: `footer/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),

    // Update footer with logo
    updateFooterWithLogo: builder.mutation({
      query: ({ id, data }) => ({
        url: `footer/update/logo/${id}?locationFolder=footer-images`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});
