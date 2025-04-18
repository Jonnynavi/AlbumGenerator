import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./apis/usersApi";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photoApi";


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(usersApi.middleware)
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware);
    }
});

setupListeners(store.dispatch);

export { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } from "./apis/usersApi";
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from "./apis/albumsApi";
export { useFetchPhotoQuery, useAddPhotoMutation, useRemovePhotoMutation } from "./apis/photoApi";