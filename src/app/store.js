import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import cartReducer from '../components/CartComponent/cartSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});