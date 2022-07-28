import React, { Component } from 'react';
import './product-list.scss';
import { withParams } from '../../hocs/withParams';
import { withNavigate } from '../../hocs/withNavigate';

class ProductItem extends Component {
  clickHandler = (e, path) => {
    if (e.target.type !== 'submit') {
      this.props.navigate(path);
    }
  };

  render() {
    const { price, currentCategory, addProduct, product } = this.props;
    const { id, inStock, gallery, name } = product;
    const { categoryName } = this.props.params;
    const path = categoryName ? id : `${currentCategory}/${id}`;

    const classes = `products__item product ${inStock ? '' : 'product_out-of-stock'}`;
    return (
      <li className={classes}>
        <div onClick={e => this.clickHandler(e, path)} className="product__card">
          <div className="product__img">
            <img src={gallery[0]} alt="product" />
          </div>
          <div className="product__name">{name}</div>
          <div className="product__price">{`${price.currency.symbol}${price.amount}`}</div>
          <button onClick={() => addProduct(product)} className="product__cart-btn" />
        </div>
      </li>
    );
  }
}

export default withParams(withNavigate(ProductItem));
