import apiService from "../api-service/api-service";


export const newsletterApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        subscribeNewsLetter: builder.mutation({
            query: (data) => ({
                url: "newsletter/subscribe",
                method: 'POST',
                body: data
            }),
        }),
    }),
})