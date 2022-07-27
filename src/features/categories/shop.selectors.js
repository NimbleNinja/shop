export const categoriesNamesSelector = state => {
  return state.categories.categoriesList;
};

export const categoryNameSelector = state => {
  return state.categories.currentCategory;
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
