import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './api';
import itemsReducer from './slices/itemsSlice';

// Create a function that makes a new store to prevent SSR issues
export const makeStore = () => {
    const store = configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            items: itemsReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
        // Enable Redux DevTools only in development
        devTools: process.env.NODE_ENV !== 'production',
    });

    setupListeners(store.dispatch);
    return store;
};

// Prevent multiple store instances during HMR
let store;

export function getStore() {
    if (typeof window === 'undefined') return makeStore();
    if (!store) store = makeStore();
    return store;
}
