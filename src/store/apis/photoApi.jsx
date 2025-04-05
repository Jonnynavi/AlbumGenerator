import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const photosApi = createApi({
    reducerPath: 'photosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return{
            fetchPhoto: builder.query({
                query: (albumId) => {
                    return {
                        url: `/photos`,
                        params: {
                            albumId,
                        },
                        method: 'GET',
                    };
                },
                providesTags: (result, error, albumId) => {
                    const tags = result.map((photo) => {
                        return { type: 'photos', id: photo.id };
                    });
                    tags.push({ type: 'photos', albumId });
                    return tags;
                }
            }),
            addPhoto: builder.mutation({
                query: (albumId) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            albumId,
                            url: faker.image.urlPicsumPhotos(400,400, true),
                            title: faker.commerce.productName(),
                        },
                    };
                },
                invalidatesTags:  (result, error, albumId) => {
                    return [{type: 'photos', albumId}]
                },
            }),
            removePhoto: builder.mutation({
                query: (id) => {
                    return {
                        url: `/photos/${id}`,
                        method: 'DELETE',
                    };
                },
                invalidatesTags: (result, error, id) => {
                    return [{ type: 'photos', id}];
                }
            }),
        }
    }
});

export const { useFetchPhotoQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };