import apiService from "../api-service/api-service";

export const blogsApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // create a new user
        createBlog: builder.mutation({
            query: (formData) => ({
                url: `blogs/create-blog?locationFolder=blog-images`,
                method: "POST",
                body: formData
            }),
        }),

        // get all blogs
        getAllBlogs: builder.query({
            query: () => ({
                url: "blogs/all-blogs"
            })
        }),

        // get 3 blogs
        getThreeBlogsForHome: builder.query({
            query: () => ({
                url: "blogs/home-blogs"
            })
        }),

        // get all blogs categories
        getAllBlogsCategories: builder.query({
            query: () => ({
                url: "blogs/blog-categories"
            })
        }),

        // get a spacific single event
        getBlogById: builder.query({
            query: (id) => ({
                url: `blogs/${id}`
            })
        }),


        // update a event
        updateBlog: builder.mutation({
            query: ({ id, formData}) => ({
                url: `blogs/update/${id}`,
                method: "PATCH",
                body: formData
            })
        }),

        // update a event
        updateBlogByIdWithImage: builder.mutation({
            query: ({ id, formData}) => ({
                url: `blogs/${id}/update-image?locationFolder=blog-images`,
                method: "PATCH",
                body: formData
            })
        }),

        // delete a event
        deleteBlog: builder.mutation({
            query: (id) => ({

                url: `blogs/delete/${id}`,
                method: "DELETE"
            })
        })
    
    }),
})