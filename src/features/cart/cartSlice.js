import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  overlayStatus: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = state.items.find(({ id }) => {
        return id === action.payload.id;
      });

      if (product) {
        product.count = product.count + 1;
      } else {
        const attributes = action.payload.attributes.map(attr => {
          return {
            ...attr,
            active: attr.active ? attr.active : attr.items[0].value,
          };
        });

        state.items.push({
          ...action.payload,
          attributes,
          count: action.payload.count ? action.payload.count + 1 : 1,
        });
      }
    },
    setCartOverlayStatus: (state, action) => {
      state.overlayStatus = action.payload;
    },
    toggleCartOverlayStatus: state => {
      state.overlayStatus = !state.overlayStatus;
    },
    incrementCount: (state, action) => {
      const product = state.items.find(item => item.id === action.payload);

      product.count += 1;
    },
    decrementCount: (state, action) => {
      const product = state.items.find(item => item.id === action.payload);

      if (product.count === 1) {
        state.items = state.items.filter(({ id }) => id !== product.id);
      } else {
        product.count -= 1;
      }
    },
    setActiveAttribute: (state, action) => {
      const { productId, attributeId, attributeValue } = action.payload;

      const product = state.items.find(item => {
        return item.id === productId;
      });

      const attribute = product.attributes.find(attr => {
        return attr.id === attributeId;
      });

      if (attribute) {
        attribute.active = attributeValue;
      }
    },
  },
});

export const {
  addProduct,
  incrementCount,
  decrementCount,
  setActiveAttribute,
  setCartOverlayStatus,
  toggleCartOverlayStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
