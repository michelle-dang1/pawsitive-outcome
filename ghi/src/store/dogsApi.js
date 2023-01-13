import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authApi } from './authApi'


export const dogsApi = createApi({
    reducerPath: 'dogs',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_PAWSITIVE_SERVICE_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            const selector = authApi.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['ListDogs'],
    endpoints: builder => ({
        getDogs: builder.query({
            // To pass arguments to the URL, you do it inside of the query(*here*)
            query: () => ({
                url: '/api/dogs',
                credentials: 'include',
            }),
            providesTags: ['ListDogs'],
        }),
        createDog: builder.mutation({
            query: data => ({
                url: '/api/dogs',
                body: data,
                method: 'POST',
            }),
            invalidatesTags: ['ListDogs']
        }),
    }),
})

export const { useGetDogsQuery, useCreateDogMutation } = dogsApi
