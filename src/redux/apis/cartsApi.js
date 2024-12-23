import apiService from "../api-service/api-service";

export const cartsApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // Add to cart
        addToCart: builder.mutation({
            query: (cart) => ({
                url: "carts/add-to-cart",
                method: "POST",
                body: cart,
            }),
        }),

        // Get all carts by user ID
        getAllCartsByUserId: builder.query({
            query: (userId) => ({
                url: `carts/user/${userId}`,
            }),
        }),

        // Get cart by ID
        getCartById: builder.query({
            query: (id) => ({
                url: `carts/${id}`,
            }),
        }),

        // Update cart by ID
        updateCartById: builder.mutation({
            query: ({ id, data }) => ({
                url: `carts/update/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        // Update quantity by ID
        updateQuantityById: builder.mutation({
            query: ({ id, quantityChange }) => ({
                url: `carts/update/${id}/quantity`,
                method: "PATCH",
                body: { quantityChange },
            }),
        }),

        // Delete cart by ID
        deleteCartById: builder.mutation({
            query: (id) => ({
                url: `carts/delete/${id}`,
                method: "DELETE",
            }),
        }),

        // Delete all carts by user ID
        deleteCartsByUserId: builder.mutation({
            query: (userId) => ({
                url: `carts/user/${userId}/carts`,
                method: "DELETE",
            }),
        }),
    }),
});
