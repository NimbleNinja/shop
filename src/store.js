import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/shop/shopSlice';
import cartReducer from './features/cart/cartSlice';
import productSlice from './features/product/productSlice';

export const store = configureStore({
  reducer: {
    shop: categoriesReducer,
    product: productSlice,
    cart: cartReducer,
  },
});
