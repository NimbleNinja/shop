import React, { Component } from 'react';
import './app.scss';
import cartIcon from './images/cart.svg';
import logo from './images/logo.svg';
import ProductList from './pages/ProductList/ProductList';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="header__content container">
            <ul className="header__categories">
              <li className="header__categories-item">Women</li>
              <li className="header__categories-item">Men</li>
              <li className="header__categories-item">Kids</li>
            </ul>
            <img className="header__logo" src={logo} alt="logo" />
            <div className="header__actions actions">
              <div className="actions__currency-switcher">
                <div className="actions__currency-switcher-symbol">$</div>
              </div>
              <div className="actions__cart">
                <img src={cartIcon} alt="cart" className="actions__cart-icon" />
                <div className="actions__cart-counter">0</div>
              </div>
            </div>
          </div>
        </header>
        <div className="content">
          <div className="container">
            <ProductList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
