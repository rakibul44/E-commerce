import apiService from "../api-service/api-service";

const pagesApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new page
        createPage: builder.mutation({
            query: (page) => ({
                url: "pages/create-page",
                method: "POST",
                body: page,
            }),
        }),

        // Create a new page
        createPages: builder.mutation({
            query: (pages) => ({
                url: "pages/create-pages",
                method: "POST",
                body: pages,
            }),
        }),

        // Get all pages
        getAllPages: builder.query({
            query: () => ({
                url: "pages",
            }),
        }),

        // Get a page by ID
        getPageById: builder.query({
            query: (id) => ({
                url: `pages/${id}`,
            }),
        }),

        // Get a page by ID
        getSubpageById: builder.query({
            query: ({ pageId, submenuId}) => ({
                url: `pages/subpage/${pageId}/${submenuId}`,
            }),
        }),

        // Get a page by slug
        getPageBySlug: builder.query({
            query: (slug) => ({
                url: `pages/slug/${slug}`,
            }),
        }),

     

        // Update a page by ID
        updatePage: builder.mutation({
            query: ({ id, data }) => ({
                url: `pages/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        // Update a page by ID
        updateSubpageById: builder.mutation({
            query: ({ pageId, submenuId, data }) => ({
                url: `pages/${pageId}/${submenuId}`,
                method: "PATCH",
                body: data,
            }),
        }),

        // Delete a page by ID
        deletePage: builder.mutation({
            query: (id) => ({
                url: `pages/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});


export default pagesApi

