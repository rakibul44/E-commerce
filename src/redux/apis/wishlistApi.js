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

        // Get all wishlists by user Ip
        getAllWishlistsByUserIp: builder.query({
            query: () => ({
                url: `wishlist/device`,
            }),
        }),

        // Get wishlist by ID
        getwishlistById: builder.query({
            query: (id) => ({
                url: `wishlist/${id}`,
            }),
        }),

        // Delete wishlist by ID
        deletewishlistById: builder.mutation({
            query: (id) => ({
                url: `wishlist/remove/${id}`,
                method: "DELETE",
            }),
        }),

        // Delete all wishlists by user ID
        deletewishlistsByUserIp: builder.mutation({
            query: () => ({
                url: `wishlist/device/clear`,
                method: "DELETE",
            }),
        }),
    }),
});
