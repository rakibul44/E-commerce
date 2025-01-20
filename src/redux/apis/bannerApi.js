import apiService from "../api-service/api-service";

export const bannerApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // create a new user
        createBanner: builder.mutation({
            query: (formData) => ({
                url: `banner/create-banner?locationFolder=banner-images`,
                method: "POST",
                body: formData
            }),
        }),

        // get a spacific single banner
        getBannerById: builder.query({
            query: (id) => ({
                url: `banner/${id}`
            })
        }),

        // update a banner
        updateBanner: builder.mutation({
            query: ({ id, data}) => ({
                url: `banner/update/${id}`,
                method: "PATCH",
                body: data
            })
        }),

        // update a banner
        updateBannerWithImage: builder.mutation({
            query: ({ id, formData}) => ({
                url: `banner/update-with-image/${id}?locationFolder=banner-images`,
                method: "PATCH",
                body: formData
            })
        }),
    }),
})