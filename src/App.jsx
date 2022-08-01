import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import ProductDescription from './pages/ProductDescription/ProductDescription';
import ProductList from './pages/ProductList/ProductList';

import { cartQuantitySelector, overlayStatusSelector } from './features/cart/cart.selectors';
import {
  categoriesSelector,
  currenciesListSelector,
  currencyModalStatusSelector,
  currentCategorySelector,
  generalCurrencySelector,
} from './features/shop/shop.selectors';
import {
  getCategories,
  getProductsByCategory,
  changeCurrency,
  toggleCurrencyModalStatus,
} from './features/shop/shopSlice';

import cartIcon from './images/cart.svg';
import logo from './images/logo.svg';

import './styles/app.scss';
import Cart from './pages/Cart/Cart';
import CartOverlay from './pages/Cart/CartOverlay';
import { toggleCartOverlayStatus } from './features/cart/cartSlice';

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  switchCurrency = (e, currency) => {
    e.stopPropagation();
    this.props.changeCurrency(currency);
  };

  render() {
    const {
      categories,
      currentCategory,
      currency,
      currencies,
      cartQuantity,
      getProductsByCategory,
      currencyModalStatus,
      toggleCurrencyModalStatus,
      overlayStatus,
      toggleCartOverlayStatus,
    } = this.props;

    return (
      <div className="app">
        <header className="header">
          <div className="header__content container">
            <ul className="header__categories">
              {categories.map(name => {
                return (
                  <Link key={name} to={`./${name}`}>
                    <li
                      onClick={() => getProductsByCategory(name)}
                      className={`header__categories-item ${
                        currentCategory === name ? 'header__categories-item_active' : ''
                      }`}
                    >
                      {name}
                    </li>
                  </Link>
                );
              })}
            </ul>
            <img className="header__logo" src={logo} alt="logo" />
            <div className="header__actions actions">
              <div
                className="actions__currency-switcher currency-switcher"
                onClick={() => toggleCurrencyModalStatus()}
              >
                <div className="currency-switcher__symbol">{currency.symbol}</div>
                {currencyModalStatus ? (
                  <div className="currency-switcher__modal">
                    {currencies.map(currency => {
                      return (
                        <div
                          onClick={e => this.switchCurrency(e, currency)}
                          key={currency.label}
                          className="currency-switcher__item"
                        >{`${currency.symbol} ${currency.label}`}</div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              {/*<Link to="./cart">*/}
              <div className="actions__cart" onClick={() => toggleCartOverlayStatus()}>
                <img src={cartIcon} alt="cart" className="actions__cart-icon" />
                <div className="actions__cart-counter">{cartQuantity}</div>
              </div>
              {/*</Link>*/}
            </div>
          </div>
        </header>
        <main className="content">
          {overlayStatus ? <CartOverlay /> : null}
          <div className="container">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path=":categoryName" element={<ProductList />} />
              <Route path=":categoryName/:productId" element={<ProductDescription />} />
              <Route path="cart" element={<Cart />} />
            </Routes>
          </div>
        </main>
      </div>
    );
  }
}

const mapState = state => {
  return {
    overlayStatus: overlayStatusSelector(state),
    categories: categoriesSelector(state),
    currencies: currenciesListSelector(state),
    currentCategory: currentCategorySelector(state),
    cartQuantity: cartQuantitySelector(state),
    currency: generalCurrencySelector(state),
    currencyModalStatus: currencyModalStatusSelector(state),
  };
};

const mapDispatch = {
  getCategories,
  getProductsByCategory,
  changeCurrency,
  toggleCurrencyModalStatus,
  toggleCartOverlayStatus,
};

export default connect(mapState, mapDispatch)(App);
