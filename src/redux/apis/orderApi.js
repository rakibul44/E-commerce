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
      invalidatesTags: ["order"]
    }),

    // sslcommerz order
    createSslcommerzOrder: builder.mutation({
      query: (data) => ({
        url: `orders/create-sslcommerz-order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"]
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
        url: `orders/order/${id}/${status}`,
        method: 'PATCH',
      }),
      invalidatesTags: ["order"]
    }),
   
    // get orders by status
    getOrdersByStatus: builder.query({
      query: (status) => ({
        url: `orders/status/${status}`,
        method: 'GET'
      }),
      providesTags: ["order"]
    }) ,

    // delete pending order
    deletePendingOrderById: builder.mutation({
      query: (id) => ({
        url: `orders/delete-pending-order/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["order"]
    }),

    // get all my order by user id
    getAllMyOrders: builder.query({
      query: (id) => ({
        url: `orders/my-orders/${id}`,
        method: 'GET'
      }),
      providesTags: ["order"]
    }),

  }),
});


