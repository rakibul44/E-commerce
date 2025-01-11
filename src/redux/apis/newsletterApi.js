import apiService from "../api-service/api-service";

export const newsletterApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // Subscribe to newsletter
    subscribeNewsLetter: builder.mutation({
      query: (data) => ({
        url: "newsletter/subscribe",
        method: 'POST',
        body: data,
      }),
    }),

    // Get all subscribers
    getAllSubscribers: builder.query({
      query: () => ({
        url: "newsletter/subscribers",
        method: 'GET',
      }),
    }),

    // Get subscriber by ID
    getSubscriberById: builder.query({
      query: (id) => ({
        url: `newsletter/${id}`,
        method: 'GET',
      }),
    }),

    // Get subscriber by email
    getSubscriberByEmail: builder.query({
      query: (email) => ({
        url: `newsletter/${email}`,
        method: 'GET',
      }),
    }),

    // Delete subscriber by ID
    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `newsletter/${id}`,
        method: 'DELETE',
      }),
    }),

    // Send email to multiple subscribers
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "newsletter/send-email",
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export hooks for the endpoints
export const {
  useSubscribeNewsLetterMutation,
  useGetAllSubscribersQuery,
  useGetSubscriberByIdQuery,
  useGetSubscriberByEmailQuery,
  useDeleteSubscriberMutation,
  useSendEmailMutation,
} = newsletterApi;
