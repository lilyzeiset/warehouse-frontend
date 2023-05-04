import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const warehouseApi = createApi({
    reducerPath: 'warehouseApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/warehouse/'}),
    endpoints: (builder) => {return {
        findAllWarehouses: builder.query({
            query: () => ''
        }),
        findWarehouseById: builder.query({
            query: (id) => `/${id}`
        }),
        createWarehouse: builder.mutation({
            query: (warehouse) => { return {
                method: 'POST',
                url: '',
                body: warehouse
            }}
        }),
        updateWarehouse: builder.mutation({
            query: (warehouse) => {return {
                method: 'PUT',
                url: `/${warehouse.id}`,
                body: warehouse
            }}
        }),
        deleteWarehouse: builder.mutation({
            query: (id) => {return {
                method: 'DELETE',
                url: `/${id}`,
            }}
        })
    }}
})

export const {
    useFindAllWarehousesQuery,
    useFindWarehouseByIdQuery,
    useCreateWarehouseMutation,
    useUpdateWarehouseMutation,
    useDeleteWarehouseMutation
} = warehouseApi;