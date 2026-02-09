import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseURL: 'https://jsonplaceholder.typicode.com' }), // Replace with your API
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => '/posts', // Mock as /products
            providesTags: ['Products'],
            transformResponse: (response) =>
                response.map(product => ({
                    ...product,
                    productName: product.title, // Map to ProductName
                    price: Math.floor(Math.random() * 100) + 10, // Mock price
                    offerPrice: Math.floor(Math.random() * 90) + 5, // Mock offerPrice
                    qty: Math.floor(Math.random() * 50) + 1, // Mock qty
                    descriptions: product.body, // Map to descriptions
                    addedDate: new Date().toISOString().split('T')[0], // Mock date
                    photo: '', // Mock photo as empty; handle in form
                })),
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/posts',
                method: 'POST',
                body: {
                    title: newProduct.productName,
                    body: newProduct.descriptions,
                    // Note: Real API would handle photo upload; here, simulate with base64
                },
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, updatedProduct }) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: {
                    title: updatedProduct.productName,
                    body: updatedProduct.descriptions,
                },
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useFetchProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;