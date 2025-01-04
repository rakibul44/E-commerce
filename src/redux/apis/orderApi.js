import apiService from "../api-service/api-service";

export const orderApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // cash on delivery order
    cashOnDeliveryOrder: builder.mutation({
      query: (data) => ({
        url: `orders/create-cash-ondelivery-order`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});


