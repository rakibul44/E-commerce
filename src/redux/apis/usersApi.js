import apiService from "../api-service/api-service";

export const usersApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        // create a new user
        createUsers: builder.mutation({
            query: (userInfo) => ({
                url: "users/create-user",
                method: "POST",
                body: userInfo
            }),
        }),

        // get all users
        getAllUsers: builder.query({
            query: () => ({
                url: "users/all-users"
            })
        }),

        // get a spacific single user
        getUserById: builder.query({
            query: (id) => ({
                url: `users/single/${id}`
            })
        }),

        // get user by email
        getUserByEmail: builder.query({
            query: (email) => ({
                url: `users/email/${email}`
            })
        }),

        // update a user
        updateUser: builder.mutation({
            query: ({ id, data}) => ({
                url: `users/update/${id}`,
                method: "PATCH",
                body: data
            })
        }),

        // delete a user
        deleteUsers: builder.mutation({
            query: (id) => ({

                url: `users/delete/${id}`,
                method: "DELETE"
            })
        }),

        // get all customers
        getAllCustomers: builder.query({
            query: () => ({
                url: "users/all-customers"
            }),
        }),
    }),
})