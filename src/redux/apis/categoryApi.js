import apiService from "../api-service/api-service";

export const categoryApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // create a new category
        createCategory: builder.mutation({
            query: (category) => ({
                url: "categories/create-category",
                method: "POST",
                body: category
            }),
        }),


        // get all category
        getAllCategory: builder.query({
            query: () => ({
                url: "categories/all-category"
            })
        }),
        
        // get all category
        getCategoriesByType: builder.query({
            query: (type) => ({
                url: `categories/category-type/${type}`
            })
        }),

        // get a spacific single category
        getCategoryById: builder.query({
            query: (id) => ({
                url: `categories/category/${id}`
            })
        }),

   
        // update a category
        updateCategory: builder.mutation({
            query: ({ id, data}) => ({
                url: `categories/update/${id}`,
                method: "PATCH",
                body: data
            })
        }),
        


        // delete a category
        deleteCategory: builder.mutation({
            query: (id) => ({

                url: `categories/delete/${id}`,
                method: "DELETE"
            })
        })
    }),
})