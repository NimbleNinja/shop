export const categoriesSelector = state => {
  return state.shop.categoriesList;
};

export const currenciesListSelector = state => {
  return state.shop.currenciesList;
};

export const currencyModalStatusSelector = state => {
  return state.shop.currencyModalStatus;
};

export const categoryProductsSelector = state => {
  return state.shop.categoryProducts;
};

export const generalCurrencySelector = state => {
  return state.shop.currency;
};

export const currentCategorySelector = state => {
  return state.shop.currentCategory;
};
