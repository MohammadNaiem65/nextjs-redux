// app/lib/redux/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        // Add custom headers if needed
        prepareHeaders: (headers) => {
            // You can add auth headers here
            return headers;
        },
    }),
    tagTypes: ['Item'],
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => 'items',
            providesTags: ['Item'],
        }),
        getItemById: builder.query({
            query: (id) => `items/${id}`,
            providesTags: (result, error, id) => [{ type: 'Item', id }],
        }),
        addItem: builder.mutation({
            query: (item) => ({
                url: 'items',
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Item'],
        }),
        updateItem: builder.mutation({
            query: (item) => ({
                url: `items/${item.id}`,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Item', id: arg.id },
            ],
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `items/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Item'],
        }),
    }),
});

export const {
    useGetItemsQuery,
    useGetItemByIdQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = api;
