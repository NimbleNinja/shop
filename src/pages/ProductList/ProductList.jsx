import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../features/cart/cartSlice';
import {
  categoryNameSelector,
  categoryProductsSelector,
  generalCurrencySelector,
} from '../../features/categories/shop.selectors';
import { getProductsByCategory } from '../../features/categories/shopSlice';
import { withParams } from '../../hocs/ComponentWithParams';
import ProductItem from './ProductItem';

class ProductList extends Component {
  componentDidMount() {
    const { categoryName } = this.props.params;
    this.props.getProductsByCategory(categoryName || 'all');
  }

  render() {
    const { categoryName, addProduct, products, currentCurrency } = this.props;

    return (
      <section className="products">
        <h2 className="products__title">{categoryName}</h2>
        <ul className="products__list">
          {products.map(({ id, name, prices, gallery }) => {
            const price = prices.find(({ currency }) => {
              return currency.label === currentCurrency;
            });

            return (
              <ProductItem
                key={id}
                id={id}
                name={name}
                price={price}
                imgSrc={gallery[0]}
                addProduct={addProduct}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}

const mapState = state => {
  return {
    currentCategory: state.categories.currentCategory,
    categoryName: categoryNameSelector(state),
    products: categoryProductsSelector(state),
    currentCurrency: generalCurrencySelector(state),
  };
};

const mapDispatch = {
  addProduct,
  getProductsByCategory,
};

export default connect(mapState, mapDispatch)(withParams(ProductList));
