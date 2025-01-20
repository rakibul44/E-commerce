import apiService from "../api-service/api-service";

export const otpApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // Send otp
    sendOtp: builder.mutation({
      query: ({email}) => ({
        url: `otp/send-otp`,
        method: "POST",
        body: {email},
      }),
    }),

    // verify otp
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `otp/send-otp`,
        method: "POST",
        body: { email, otp },
      }),
    }),

  }),
});


