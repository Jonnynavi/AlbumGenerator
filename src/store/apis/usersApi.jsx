import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
    }),
    endpoints(builder) {
        return{
            removeUser: builder.mutation({
                query: (userId) => {
                    return { 
                        url: `/users/${userId}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["Users"],
            }),
            addUser: builder.mutation({
                query: () => {
                    return {
                        url: "/users",
                        method: "POST",
                        body: {
                            name: faker.person.fullName(),                       
                        },
                    }
                },
                invalidatesTags: ["Users"],
            }),
            fetchUsers: builder.query({
                query: () => {
                    return {
                        url: '/users',
                        method: 'GET',
                    };
                },
                providesTags: ["Users"]
            }),
        };
    },
});

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } = usersApi;
export { usersApi };