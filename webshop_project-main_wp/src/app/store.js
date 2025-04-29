import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './app/slices/productsSlice';
import cartReducer from './app/slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});