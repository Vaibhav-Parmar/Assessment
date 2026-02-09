import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/productAPI.js'; // Ensure path is correct
import productsReducer from '../features/products/productsSlice';

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});