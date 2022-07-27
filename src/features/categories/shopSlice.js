import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsByCategory, initFetch } from './shop.gateway';

const initialState = {
  isLoading: false,
  currency: 'USD',
  currentCategory: '',
  categoryProducts: [],
  categoriesList: [],
  currenciesList: [],
};

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await initFetch();
  return response;
});

export const getProductsByCategory = createAsyncThunk(
  'categories/getProductsByCategory',
  async category => {
    const response = await fetchProductsByCategory(category);
    return response;
  },
);

const shopSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        const { categories, currencies } = action.payload;
        state.categoriesList = categories.map(category => category.name);
        state.currentCategory = categories[0].name;
        state.currenciesList = currencies;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload.data.category.products;
        state.currentCategory = action.payload.data.category.name;
      });
  },
});

export const { setCategory } = shopSlice.actions;

export default shopSlice.reducer;
