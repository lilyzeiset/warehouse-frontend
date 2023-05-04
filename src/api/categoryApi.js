import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/category'}),
    endpoints: (builder) => {return {
        findAllCategories: builder.query({
            query: () => ''
        }),
        findCategoryById: builder.query({
            query: (id) => `/${id}`
        }),
        createCategory: builder.mutation({
            query: (category) => { return {
                method: 'POST',
                url: '',
                body: category
            }}
        }),
        updateCategory: builder.mutation({
            query: (category) => {return {
                method: 'PUT',
                url: `/${category.id}`,
                body: category
            }}
        }),
        deleteCategory: builder.mutation({
            query: (id) => {return {
                method: 'DELETE',
                url: `s/${id}`,
            }}
        })
    }}
})

export const {
    useFindAllCategoriesQuery,
    useFindCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;