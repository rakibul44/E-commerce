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

    // sslcommerz order
    createSslcommerzOrder: builder.mutation({
      query: (data) => ({
        url: `orders/create-sslcommerz-order`,
        method: "POST",
        body: data,
      }),

    }),


    // get all orders 
    getAllOrder: builder.query({
      query: () => ({
        url: 'orders/all-orders',
        method: "GET"
      }),
      providesTags: ["order"]
    }),
    
    // update order by order _id
    updateOrderStatusById: builder.mutation({
      query: (id, status) => ({
        url: `orders/order/${id}/status`,
        method: 'PATCH',
        body: status
      }),
      invalidatesTags: ["order"]
    })

  }),
});


