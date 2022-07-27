import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addProduct, changeMainPhoto } = cartSlice.actions;

export default cartSlice.reducer;
