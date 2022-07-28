export const categoriesSelector = state => {
  return state.categories.categoriesList;
};

export const currenciesListSelector = state => {
  return state.categories.currenciesList;
};

export const currencyModalStatusSelector = state => {
  return state.categories.currencyModalStatus;
};

export const categoryProductsSelector = state => {
  return state.categories.categoryProducts;
};

export const generalCurrencySelector = state => {
  return state.categories.currency;
};

export const currentCategorySelector = state => {
  return state.categories.currentCategory;
};
