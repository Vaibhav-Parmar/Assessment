import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseURL: 'https://conkzmyabiruqtulxnqy.supabase.co/rest/v1',
        prepareHeaders: (headers, { getState }) => {
            console.log('prepareHeaders called'); // Add this for debugging
            headers.set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbmt6bXlhYmlydXF0dWx4bnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDU2MzUsImV4cCI6MjA4NjIyMTYzNX0.5116lI4yv5zHzoUp-aYsra7vMJ2IlC099k-ppKvzYJE');
            headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbmt6bXlhYmlydXF0dWx4bnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDU2MzUsImV4cCI6MjA4NjIyMTYzNX0.5116lI4yv5zHzoUp-aYsra7vMJ2IlC099k-ppKvzYJE`);
            headers.set('Content-Type', 'application/json');
            console.log('Headers set:', headers.get('apikey'), headers.get('Authorization')); // Add this
            return headers;
        },
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => '/products',
            providesTags: ['Products'],
            transformResponse: (response) => response,
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/products',
                method: 'POST',
                body: {
                    productName: newProduct.productName,
                    price: newProduct.price,
                    offerPrice: newProduct.offerPrice,
                    qty: newProduct.qty,
                    descriptions: newProduct.descriptions,
                    addedDate: newProduct.addedDate,
                    photo: newProduct.photo || '',
                },
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, updatedProduct }) => ({
                url: `/products?id=eq.${id}`,
                method: 'PATCH',
                body: {
                    productName: updatedProduct.productName,
                    price: updatedProduct.price,
                    offerPrice: updatedProduct.offerPrice,
                    qty: updatedProduct.qty,
                    descriptions: updatedProduct.descriptions,
                    addedDate: updatedProduct.addedDate,
                    photo: updatedProduct.photo || '',
                },
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products?id=eq.${id}`,
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