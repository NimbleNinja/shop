import React, { Component } from 'react';
import './product-list.scss';
import cartIcon from '../../images/cart-white.svg';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
  render() {
    //product_out-of-stock
    const { name, price, imgSrc, addProduct, id } = this.props;
    return (
      <li className="products__item product">
        <Link to={id}>
          <div className="product__card">
            <div className="product__img">
              <img src={imgSrc} alt="product" />
            </div>
            <div className="product__name">{name}</div>
            <div className="product__price">{`${price.currency.symbol}${price.amount}`}</div>
            <button onClick={() => addProduct(id)} className="product__cart-btn">
              <img className="product__cart-btn-icon" src={cartIcon} alt="cart icon" />
            </button>
          </div>
        </Link>
      </li>
    );
  }
}

export default ProductItem;
