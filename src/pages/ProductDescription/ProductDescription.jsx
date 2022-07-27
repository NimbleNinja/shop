import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeActiveAttribute,
  changeMainPhoto,
  getProductById,
} from '../../features/product/productSlice';
import { withParams } from '../../hocs/ComponentWithParams';
import './product-description.scss';

class ProductDescription extends Component {
  componentDidMount() {
    const { productId } = this.props.params;
    this.props.getProductById(productId);
  }

  render() {
    const { id, name, inStock, brand, gallery, description, attributes, prices } =
      this.props.currentProduct;

    const { currentCurency, mainPhotoSrc, changeMainPhoto, changeActiveAttribute } = this.props;
    const price = prices.find(item => item.currency.label === currentCurency);

    return (
      <div className="product-info">
        <div className="product-info__gallery">
          {gallery.map(src => {
            return (
              <div
                key={src}
                onClick={() => changeMainPhoto(src)}
                className="product-info__gallery-item"
              >
                <img src={src} alt="" />
              </div>
            );
          })}
        </div>
        <img src={mainPhotoSrc} alt="product" className="product-info__image" />
        <div className="product-info__description">
          <h3 className="product-info__brand">{brand}</h3>
          <div className="product-info__name">{name}</div>
          <div className="product-info__attributes">
            {attributes.map(({ name, type, items, active, ...attr }) => {
              if (type === 'swatch') {
                return (
                  <div key={attr.id} className="attribute-color">
                    <h4 className="attribute-color__title attribute-title">{`${name}:`}</h4>
                    <div className="attribute-color__items">
                      {items.map(({ id, value }) => {
                        const activeClass = active === value ? 'attribute-color__item_active' : '';
                        return (
                          <div
                            onClick={() => changeActiveAttribute({ id: attr.id, value })}
                            key={id}
                            className={`attribute-color__item ${activeClass}`}
                          >
                            <div
                              style={{ background: `${value}` }}
                              className="attribute-color__item-square"
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <div key={attr.id} className="attribute-text">
                  <h4 className="attribute-text__title attribute-title">{`${name}:`}</h4>
                  <div className="attribute-text__items">
                    {items.map(({ id, value }) => {
                      const activeClass = active === value ? 'attribute-text__item_active' : '';
                      return (
                        <span
                          onClick={() => changeActiveAttribute({ id: attr.id, value })}
                          key={id}
                          className={`attribute-text__item ${activeClass}`}
                        >
                          {value}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="attribute-price">
              <div className="attribute-price__title attribute-title">PRICE:</div>
              <div className="attribute-price__amount">
                {price ? `${price.currency.symbol}${price.amount}` : ''}
              </div>
            </div>
          </div>
          <button className="product-info__cart-btn btn">ADD TO CART</button>
          <div className="product-info__description">{description}</div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    currentProduct: state.product.currentProduct,
    mainPhotoSrc: state.product.mainPhotoSrc,
    currentCurency: state.categories.currency,
  };
};

const mapDispatch = {
  getProductById: getProductById,
  changeMainPhoto: changeMainPhoto,
  changeActiveAttribute: changeActiveAttribute,
};

export default connect(mapState, mapDispatch)(withParams(ProductDescription));
