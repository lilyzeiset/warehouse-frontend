import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const itemApi = createApi({
    reducerPath: 'itemApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/item/'}),
    endpoints: (builder) => {return {
        findAllItems: builder.query({
            query: () => ''
        }),
        findItemById: builder.query({
            query: (id) => `/${id}`
        }),
        createItem: builder.mutation({
            query: (item) => { return {
                method: 'POST',
                url: '',
                body: item
            }}
        }),
        updateItem: builder.mutation({
            query: (item) => {return {
                method: 'PUT',
                url: `/${item.id}`,
                body: item
            }}
        }),
        deleteItem: builder.mutation({
            query: (id) => {return {
                method: 'DELETE',
                url: `/${id}`,
            }}
        })
    }}
})

export const {
    useFindAllItemsQuery,
    useFindItemByIdQuery,
    useCreateItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation
} = itemApi;