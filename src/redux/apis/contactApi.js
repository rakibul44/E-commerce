import apiService from "../api-service/api-service";

export const contactApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new contact
    createContact: builder.mutation({
      query: (contact) => ({
        url: "contact",
        method: "POST",
        body: contact,
      }),
    }),

    // Get all contacts
    getAllContacts: builder.query({
      query: () => ({
        url: "contact",
      }),
    }),

    // Get a contact by ID
    getContactById: builder.query({
      query: (id) => ({
        url: `contact/${id}`,
      }),
    }),

    // Update a contact by ID
    updateContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `contact/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Delete a contact by ID
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contact/${id}`,
        method: "DELETE",
      }),
    }),

    // send support email
    sendSupportEmail: builder.mutation({
      query: (data) => ({
        url: "contact/send-email",
        method: "POST",
        body: data
      })
    })
  }),
});
