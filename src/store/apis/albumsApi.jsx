import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker, tr } from '@faker-js/faker';

const albumsApi = createApi({
    reducerPath: 'albumsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                query: (user) => {
                    return {
                        url: `/albums`,
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    };
                },
                providesTags: (result, error, user) =>{
                    return [{type: 'Albums', id: user.id}]
                }
            }),
            addAlbum: builder.mutation({
                query: (user) => {
                    return {
                        url: './albums',
                        method: 'POST',
                        body: {
                            title: faker.commerce.productName(),
                            userId: user.id,
                        }
                    }
                },
                invalidatesTags: (result, error, user) => {
                    return [{type: 'Albums', id: user.id}]
                }
            }),
            removeAlbum: builder.mutation({
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: (result, error, album) => {
                    return [{type: 'Albums', id: album.userId}]
                }
            }), 
        }
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };