import apiService from "../api-service/api-service";

export const brandApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new brand
        createBrand: builder.mutation({
            query: (brand) => ({
                url: "brands/create-brand",
                method: "POST",
                body: brand,
            }),
        }),

        // Get all brands
        getAllBrands: builder.query({
            query: () => ({
                url: "brands/all-brands",
            }),
        }),

        // Get active brands
        getActiveBrands: builder.query({
            query: () => ({
                url: "brands/active-brands",
            }),
        }),

        // Get featured brands
        getFeaturedBrands: builder.query({
            query: () => ({
                url: "brands/featured-brands",
            }),
        }),

        // Get a specific brand by ID
        getBrandById: builder.query({
            query: (id) => ({
                url: `brands/brand/${id}`,
            }),
        }),

        // Update a brand
        updateBrand: builder.mutation({
            query: ({ id, data }) => ({
                url: `brands/update/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),

        // Delete a brand
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `brands/delete/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});
