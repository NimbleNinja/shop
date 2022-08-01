import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../features/cart/cartSlice';
import {
  currentCategorySelector,
  categoryProductsSelector,
  generalCurrencySelector,
} from '../../features/shop/shop.selectors';
import { getProductsByCategory } from '../../features/shop/shopSlice';
import { withParams } from '../../hocs/withParams';
import ProductItem from './ProductItem';

class ProductList extends Component {
  componentDidMount() {
    const { categoryName } = this.props.params;
    this.props.getProductsByCategory(categoryName || 'all');
  }

  render() {
    const { currentCategory, addProduct, products, currentCurrency } = this.props;

    return (
      <section className="products">
        <h2 className="products__title">{currentCategory}</h2>
        <ul className="products__list">
          {products.map(product => {
            const price = product.prices.find(({ currency }) => {
              return currency.label === currentCurrency.label;
            });

            return (
              <ProductItem
                currentCategory={currentCategory}
                key={product.id}
                product={product}
                price={price}
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
    currentCategory: currentCategorySelector(state),
    products: categoryProductsSelector(state),
    currentCurrency: generalCurrencySelector(state),
  };
};

const mapDispatch = {
  addProduct,
  getProductsByCategory,
};

export default connect(mapState, mapDispatch)(withParams(ProductList));
