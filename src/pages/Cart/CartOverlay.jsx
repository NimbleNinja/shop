import React, { Component } from 'react';
import './cart-overlay.scss';
import { connect } from 'react-redux';
import { cartItemsSelector } from '../../features/cart/cart.selectors';
import { generalCurrencySelector } from '../../features/shop/shop.selectors';
import { setActiveAttribute, setCartOverlayStatus } from '../../features/cart/cartSlice';
import { withNavigate } from '../../hocs/withNavigate';

class CartOverlay extends Component {
  viewBagHandler = () => {
    const { navigate, setCartOverlayStatus } = this.props;
    navigate('./cart');
    setCartOverlayStatus(false);
  };

  render() {
    const { items, currentCurrency, setActiveAttribute } = this.props;

    return (
      <div className="cart-overlay">
        <div className="cart-overlay__container container">
          <div className="cart-overlay__modal modal">
            <div className="modal__title">
              <span className="modal__title_fw700">My Bag</span>, 3 items
            </div>
            <ul className="modal__items">
              {items.map(({ id, count, brand, name, gallery, prices, attributes }) => {
                const price = prices.find(({ currency }) => {
                  return currency.label === currentCurrency.label;
                });
                return (
                  <li key={id} className="modal__item modal-item">
                    <div className="modal-item__info">
                      <div className="modal-item__brand">{brand}</div>
                      <div className="modal-item__name">{name}</div>
                      <div className="modal-item__price">{`${price.currency.symbol}${price.amount}`}</div>
                      <div className="modal-item__attributes">
                        {attributes.map(({ name, type, items, active, ...attr }) => {
                          if (type === 'swatch') {
                            return (
                              <div
                                key={attr.id}
                                className="modal-item__attributes-item item-color-attribute"
                              >
                                <div className="item-color-attribute__title">{`${name}:`}</div>
                                <div className="item-color-attribute__items">
                                  {items.map(attrItem => {
                                    const classes = `item-color-attribute__item ${
                                      active === attrItem.value
                                        ? 'item-color-attribute__item_active'
                                        : ''
                                    }`;
                                    return (
                                      <div
                                        onClick={() =>
                                          setActiveAttribute({
                                            productId: id,
                                            attributeId: attr.id,
                                            attributeValue: attrItem.value,
                                          })
                                        }
                                        key={attrItem.id}
                                        className={classes}
                                      >
                                        <div
                                          style={{ background: `${attrItem.value}` }}
                                          className="item-color-attribute__item-square"
                                        ></div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={attr.id}
                              className="modal-item__attributes-item item-text-attribute"
                            >
                              <h4 className="item-text-attribute__title">Size:</h4>
                              <div className="item-text-attribute__items">
                                {items.map(attrItem => {
                                  const classes = `item-text-attribute__item ${
                                    active === attrItem.value
                                      ? 'item-text-attribute__item_active'
                                      : ''
                                  }`;
                                  return (
                                    <span
                                      onClick={() =>
                                        setActiveAttribute({
                                          productId: id,
                                          attributeId: attr.id,
                                          attributeValue: attrItem.value,
                                        })
                                      }
                                      key={attrItem.id}
                                      className={classes}
                                    >
                                      {attrItem.value}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="modal-item__counter item-counter">
                      <div className="item-counter__btn item-counter__btn-increment" />
                      <div className="item-counter__value">{count}</div>
                      <div className="item-counter__btn item-counter__btn-decrement" />
                    </div>

                    <div className="modal-item__image">
                      <img src={gallery[0]} alt="img" />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="modal__total">
              <span className="modal__total-text">Total</span>
              <span className="modal__total-amount">$200.00</span>
            </div>
            <div className="modal__buttons">
              <button
                onClick={() => this.viewBagHandler()}
                className="modal__btn-bag btn btn_white"
              >
                view bag
              </button>
              <button className="modal__btn-checkout btn_green btn">check out</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    items: cartItemsSelector(state),
    currentCurrency: generalCurrencySelector(state),
  };
};

const mapProps = {
  setCartOverlayStatus,
  setActiveAttribute,
};

export default connect(mapState, mapProps)(withNavigate(CartOverlay));
