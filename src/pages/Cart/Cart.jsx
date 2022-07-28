import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorAttribute from '../../components/attributes/ColorAttribute';
import TextAttribute from '../../components/attributes/TextAttribute';
import {
  cartItemsSelector,
  cartQuantitySelector,
  totalOfCartSelector,
} from '../../features/cart/cart.selectors';
import { decrementCount, incrementCount, setActiveAttribute } from '../../features/cart/cartSlice';
import { changeActiveAttribute } from '../../features/product/productSlice';
import { generalCurrencySelector } from '../../features/shop/shop.selectors';
import './cart.scss';

class Cart extends Component {
  render() {
    const {
      changeActiveAttribute,
      cartItems,
      cartQuantity,
      currentCurrency,
      total,
      incrementCount,
      decrementCount,
      setActiveAttribute,
    } = this.props;

    const { symbol } = currentCurrency;
    const tax = (total * 0.21).toFixed(2);
    const totalPrice = (total * 0.21 + total).toFixed(2);
    return (
      <div className="cart">
        <h2 className="cart__title">Cart</h2>
        <div className="cart__items">
          <hr className="cart__separator" />
          {cartItems.map(({ id, count, brand, name, gallery, prices, attributes }) => {
            const price = prices.find(({ currency }) => {
              return currency.label === currentCurrency.label;
            });
            return (
              <div key={id} className="cart__item cart-item">
                <div className="cart-item__info">
                  <div className="cart-item__brand brand-title">{brand}</div>
                  <div className="cart-item__name name-title">{name}</div>
                  <div className="cart-item__price price-amount">{`${price.currency.symbol}${price.amount}`}</div>
                  <div className="cart-item__attributes cart-attributes">
                    {attributes.map(({ name, type, items, active, ...attr }) => {
                      if (type === 'swatch') {
                        return (
                          <ColorAttribute
                            cl="cart-attributes__color"
                            key={attr.id}
                            productId={id}
                            name={name}
                            items={items}
                            active={active}
                            changeActiveAttribute={setActiveAttribute}
                            attribute={attr}
                          />
                        );
                      }
                      return (
                        <TextAttribute
                          cl="cart-attributes__text"
                          key={attr.id}
                          productId={id}
                          name={name}
                          items={items}
                          active={active}
                          changeActiveAttribute={setActiveAttribute}
                          attribute={attr}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="cart-item__counter counter">
                  <span
                    onClick={() => incrementCount(id)}
                    className="counter__btn counter__btn-increment"
                  ></span>
                  <span className="counter__value">{count}</span>
                  <span
                    onClick={() => decrementCount(id)}
                    className="counter__btn counter__btn-decrement"
                  ></span>
                </div>
                <div className="cart-item__image">
                  <img src={gallery[0]} alt="img" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart__total">
          <div className="cart__total-item">
            Tax 21%: <span className="cart__total-item_bold">{`${symbol}${tax}`}</span>
          </div>
          <div className="cart__total-item">
            Quantity: <span className="cart__total-item_bold">{cartQuantity}</span>
          </div>
          <div className="cart__total-item">
            Total: <span className="cart__total-item_bold">{`${symbol}${totalPrice}`}</span>
          </div>
        </div>
        <button className="cart__order-btn btn">ORDER</button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    cartItems: cartItemsSelector(state),
    cartQuantity: cartQuantitySelector(state),
    currentCurrency: generalCurrencySelector(state),
    total: totalOfCartSelector(state),
  };
};

const mapDispatch = {
  changeActiveAttribute,
  incrementCount,
  decrementCount,
  setActiveAttribute,
};

export default connect(mapState, mapDispatch)(Cart);
