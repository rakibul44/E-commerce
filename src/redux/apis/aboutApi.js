import apiService from "../api-service/api-service";

export const aboutApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // create a new user
        createAbout: builder.mutation({
            query: (formData) => ({
                url: `about/create-about?locationFolder=about-images`,
                method: "POST",
                body: formData
            }),
        }),

        // get a spacific single about
        getAboutById: builder.query({
            query: (id) => ({
                url: `about/${id}`
            })
        }),

        // update a about
        updateAbout: builder.mutation({
            query: ({ id, data}) => ({
                url: `about/update/${id}`,
                method: "PATCH",
                body: data
            })
        }),

        // update a about
        updateAboutWithImage: builder.mutation({
            query: ({ id, formData}) => ({
                url: `about/update-with-image/${id}?locationFolder=about-images`,
                method: "PATCH",
                body: formData
            })
        }),


    
    }),
})