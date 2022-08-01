import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsByCategory, initFetch } from './shop.gateway';

export const getCategories = createAsyncThunk('shop/getCategories', async () => {
  const response = await initFetch();
  return response;
});

export const getProductsByCategory = createAsyncThunk(
  'shop/getProductsByCategory',
  async category => {
    const response = await fetchProductsByCategory(category);
    return response;
  },
);

const initialState = {
  isLoading: false,
  currency: {
    label: 'USD',
    symbol: '$',
  },
  currencyModalStatus: false,
  currentCategory: '',
  categoryProducts: [],
  categoriesList: [],
  currenciesList: [],
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload;
      state.currencyModalStatus = false;
    },
    toggleCurrencyModalStatus: state => {
      state.currencyModalStatus = !state.currencyModalStatus;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        const { categories, currencies } = action.payload;
        state.categoriesList = categories.map(category => category.name);
        state.currentCategory = categories[0].name;
        state.currenciesList = currencies;
        state.currency = currencies[0];
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload.data.category.products;
        state.currentCategory = action.payload.data.category.name;
      });
  },
});

export const { changeCurrency, toggleCurrencyModalStatus } = shopSlice.actions;

export default shopSlice.reducer;
