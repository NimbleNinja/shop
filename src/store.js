import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categories/shopSlice';
import cartReducer from './features/cart/cartSlice';
import productSlice from './features/product/productSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    product: productSlice,
    cart: cartReducer,
  },
});
