export const cartItemsSelector = state => {
  return state.cart.items;
};

export const overlayStatusSelector = state => {
  return state.cart.overlayStatus;
};

export const cartQuantitySelector = state => {
  return state.cart.items.reduce((acc, item) => {
    return acc + item.count;
  }, 0);
};

export const totalOfCartSelector = state => {
  const { currency } = state.categories;

  return state.cart.items.reduce((acc, item) => {
    const currentPrice = item.prices.find(price => {
      return price.currency.label === currency.label;
    });

    return acc + item.count * currentPrice.amount;
  }, 0);
};
