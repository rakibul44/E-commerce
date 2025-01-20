import apiService from "../api-service/api-service";

export const headerApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // create a header
        createHeader: builder.mutation({
            query: (formData) => ({
                url: `header/create-header?locationFolder=header-images`,
                method: "POST",
                body: formData
            }),
        }),

        // get header by id
        getHeaderById: builder.query({
            query: (id) => ({
                url: `header/${id}`
            })
        }),

        // update a header
        updateHeader: builder.mutation({
            query: ({ id, formData}) => ({
                url: `header/update/${id}`,
                method: "PATCH",
                body: formData
            })
        }),

        // update  header with logo
        updateHeaderWithLogo: builder.mutation({
            query: ({ id, formData}) => ({
                url: `header/update/logo/${id}?locationFolder=header-images`,
                method: "PATCH",
                body: formData
            })
        }),

    
    }),
})