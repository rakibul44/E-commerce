import apiService from "../api-service/api-service";

export const videosApi = apiService.injectEndpoints({
    endpoints: (builder) => ({

        // Create a new video
        createVideo: builder.mutation({
            query: (formData) => ({
                url: "videos/upload-video",
                method: "POST",
                body: formData,
            }),
        }),

        // Get all videos
        getAllVideos: builder.query({
            query: () => ({
                url: "videos/videos",
            }),
        }),

        // Get the top one video
        getTopOneVideo: builder.query({
            query: () => ({
                url: "video",
            }),
        }),

        // Get a specific video by ID
        getVideoById: builder.query({
            query: (id) => ({
                url: `videos/${id}`,
            }),
        }),

        // Update a video by ID
        updateVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `videos/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete a video by ID
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `videos/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});
