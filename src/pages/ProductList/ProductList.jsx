import React, { Component } from 'react';
import productImg from '../../images/product.png';
import './product-list.scss';
import cartIcon from '../../images/cart-white.svg';

class ProductList extends Component {
  render() {
    return (
      <section className="products">
        <h2 className="products__title">Category name</h2>
        <ul className="products__list">
          <li className="products__item product">
            <div className="product__card">
              <img src={productImg} alt="" className="product__img" />
              <div className="product__name">Apollo Running Short</div>
              <div className="product__price">$50.00</div>
              <button className="product__cart-btn">
                <img className="product__cart-btn-icon" src={cartIcon} alt="cart icon" />
              </button>
            </div>
          </li>
          <li className="products__item product">
            <div className="product__card">
              <img src={productImg} alt="" className="product__img" />
              <div className="product__name">Apollo Running Short</div>
              <div className="product__price">$50.00</div>
              <button className="product__cart-btn">
                <img className="product__cart-btn-icon" src={cartIcon} alt="cart icon" />
              </button>
            </div>
          </li>
          <li className="products__item product product_out-of-stock">
            <div className="product__card">
              <img src={productImg} alt="" className="product__img" />
              <div className="product__name">Apollo Running Short</div>
              <div className="product__price">$50.00</div>
              <button className="product__cart-btn">
                <img className="product__cart-btn-icon" src={cartIcon} alt="cart icon" />
              </button>
            </div>
          </li>
          <li className="products__item product">
            <div className="product__card">
              <img src={productImg} alt="" className="product__img" />
              <div className="product__name">Apollo Running Short</div>
              <div className="product__price">$50.00</div>
              <button className="product__cart-btn">
                <img className="product__cart-btn-icon" src={cartIcon} alt="cart icon" />
              </button>
            </div>
          </li>
          <li className="products__item product">
            <div className="product__card">
              <img src={productImg} alt="" className="product__img" />
              <div className="product__name">Apollo Running Short</div>
              <div className="product__price">$50.00</div>
              <button className="product__cart-btn">
                <img className="product__cart-btn-icon" src={cartIcon} alt="cart icon" />
              </button>
            </div>
          </li>
          <li className="products__item product product_out-of-stock">
            <div className="product__card">
              <img src={productImg} alt="" className="product__img" />
              <div className="product__name">Apollo Running Short</div>
              <div className="product__price">$50.00</div>
              <button className="product__cart-btn">
                <img className="product__cart-btn-icon" src={cartIcon} alt="cart icon" />
              </button>
            </div>
          </li>
        </ul>
      </section>
    );
  }
}

export default ProductList;
