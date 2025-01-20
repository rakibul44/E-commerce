import apiService from "../api-service/api-service";

export const dashboardApi = apiService.injectEndpoints({
    endpoints: (builder) => ({

        // get  all dashboard states
        getDashboardStateValues: builder.query({
            query: () => ({
                url: `dashboard/states`
            })
        }),

        // get category-wise-events
        getCategoryWiseEvents: builder.query({
            query: () => ({
                url: `dashboard/category-wise-events`
            })
        }),

        // get category-wise-blogs
        getCategoryWiseBlogs: builder.query({
            query: () => ({
                url: `dashboard/category-wise-blogs`
            })
        }),
        
        // get eresources
        getCategoryWiseEresources: builder.query({
            query: () => ({
                url: `dashboard/category-wise-eresources`
            })
        }),



    }),
})