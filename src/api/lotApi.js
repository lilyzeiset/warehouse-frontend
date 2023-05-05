import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const lotApi = createApi({
    reducerPath: 'lotApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/lot/'}),
    endpoints: (builder) => {return {
        findAllLots: builder.query({
            query: () => ''
        }),
        findLotById: builder.query({
            query: (id) => `/${id}`
        }),
        createLot: builder.mutation({
            query: (lot) => { return {
                method: 'POST',
                url: '',
                body: lot
            }}
        }),
        updateLot: builder.mutation({
            query: (lot) => {return {
                method: 'PUT',
                url: `/${lot.id}`,
                body: lot
            }}
        }),
        deleteLot: builder.mutation({
            query: (id) => {return {
                method: 'DELETE',
                url: `/${id}`,
            }}
        }),
        findAllLotsByWarehouseId: builder.query({
          query: (warehouseId) => `/w/${warehouseId}`
      }),
    }}
})

export const {
    useFindAllLotsQuery,
    useFindLotByIdQuery,
    useCreateLotMutation,
    useUpdateLotMutation,
    useDeleteLotMutation
} = lotApi;