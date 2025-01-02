import apiService from "../api-service/api-service";

export const wishlistApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // Add to wishlist
        addToWishlist: builder.mutation({
            query: (wishlist) => ({
                url: "wishlist/add-to-wishlist",
                method: "POST",
                body: wishlist,
            }),
        }),

        // Get all wishlists by user ID
        getAllWishlistsByUserId: builder.query({
            query: (userId) => ({
                url: `wishlist/user/${userId}`,
            }),
        }),

        // Get wishlist by ID
        getwishlistById: builder.query({
            query: (id) => ({
                url: `wishlist/${id}`,
            }),
        }),

        // Update wishlist by ID
        updateWishlistById: builder.mutation({
            query: ({ id, data }) => ({
                url: `wishlist/update/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        // Update quantity by ID
        updateQuantityById: builder.mutation({
            query: ({ id, quantityChange }) => ({
                url: `wishlist/update/${id}/quantity`,
                method: "PATCH",
                body: { quantityChange },
            }),
        }),

        // Delete wishlist by ID
        deletewishlistById: builder.mutation({
            query: (id) => ({
                url: `wishlist/delete/${id}`,
                method: "DELETE",
            }),
        }),

        // Delete all wishlists by user ID
        deletewishlistsByUserId: builder.mutation({
            query: (userId) => ({
                url: `wishlist/user/${userId}/wishlists`,
                method: "DELETE",
            }),
        }),
    }),
});
