import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductById } from '../product/product.gateway';

export const getProductById = createAsyncThunk('cart/getProductById', async id => {
  const response = await fetchProductById(id);
  return response;
});

const initialState = {
  currentProduct: {
    gallery: [],
    attributes: [],
    prices: [],
  },
  mainPhotoSrc: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    changeMainPhoto: (state, action) => {
      state.mainPhotoSrc = action.payload;
    },
    changeActiveAttribute: (state, action) => {
      const { productId, attributeId, attributeValue } = action.payload;

      const product = productId
        ? state.items.find(item => {
            return item.id === productId;
          })
        : state.currentProduct;

      const attribute = product.attributes.find(attr => {
        return attr.id === attributeId;
      });

      if (attribute) {
        attribute.active = attributeValue;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductById.fulfilled, (state, action) => {
      const { product } = action.payload;

      state.currentProduct = {
        ...product,
        attributes: product.attributes.map(attr => {
          return {
            ...attr,
            active: attr.items[0].value,
          };
        }),
      };
      state.mainPhotoSrc = action.payload.product.gallery[0];
    });
  },
});

export const { changeMainPhoto, changeActiveAttribute } = productSlice.actions;

export default productSlice.reducer;
