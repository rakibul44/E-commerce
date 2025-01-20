import apiService from "../api-service/api-service";

export const authApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new token (login)
    createJwtToken: builder.mutation({
      query: (credentials) => ({
        url: `auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),

    // // Verify the token (optional for client-side validation)
    // verifyJwtToken: builder.query({
    //   query: () => ({
    //     url: `auth/verify-token`,
    //     method: "GET",
    //   }),
    // }),

    // change password
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: `auth/change-password`,
        method: "POST",
        body: passwordData,
      }),
    }),

    // Refresh the token
    refreshJwtToken: builder.mutation({
      query: (refreshToken) => ({
        url: `auth/refresh-token`,
        method: "POST",
        body: { refreshToken },
      }),
    }),

    // Logout and clear the token
    logoutUser: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

