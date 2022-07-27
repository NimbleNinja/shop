import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import { cartLengthSelector } from './features/cart/cart.selectors';
import {
  categoriesNamesSelector,
  currentCategorySelector,
} from './features/categories/shop.selectors';
import { getCategories, getProductsByCategory, setCategory } from './features/categories/shopSlice';
import cartIcon from './images/cart.svg';
import logo from './images/logo.svg';
import ProductDescription from './pages/ProductDescription/ProductDescription';
import ProductList from './pages/ProductList/ProductList';
import './styles/app.scss';

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categoriesNames, category, changeCategory, cartLength, getProductsByCategory } =
      this.props;
    return (
      <div className="app">
        <header className="header">
          <div className="header__content container">
            <ul className="header__categories">
              {categoriesNames.map(name => {
                return (
                  <Link key={name} to={`${name}`}>
                    <li
                      onClick={() => getProductsByCategory(name)}
                      className={`header__categories-item ${
                        category === name ? 'header__categories-item_active' : ''
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
              <div className="actions__currency-switcher">
                <div className="actions__currency-switcher-symbol">$</div>
              </div>
              <div className="actions__cart">
                <img src={cartIcon} alt="cart" className="actions__cart-icon" />
                <div className="actions__cart-counter">{cartLength}</div>
              </div>
            </div>
          </div>
        </header>
        <main className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path=":categoryName" element={<ProductList />} />
              <Route path=":categoryName/:productId" element={<ProductDescription />} />

              {/*<Route path="cart" element={<p>Cart</p>} />*/}
            </Routes>
          </div>
        </main>
      </div>
    );
  }
}

const mapState = state => {
  return {
    categories: state.categories.categoriesList,
    categoriesNames: categoriesNamesSelector(state),
    category: currentCategorySelector(state),
    cartLength: cartLengthSelector(state),
  };
};

const mapDispatch = {
  getCategories,
  changeCategory: setCategory,
  getProductsByCategory,
};

export default connect(mapState, mapDispatch)(App);
