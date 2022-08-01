import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorAttribute from '../../components/attributes/ColorAttribute';
import { generalCurrencySelector } from '../../features/shop/shop.selectors';
import {
  mainPhotoSrcSelector,
  currentProductSelector,
} from '../../features/product/product.selectors';
import {
  changeActiveAttribute,
  changeMainPhoto,
  getProductById,
} from '../../features/product/productSlice';
import { withParams } from '../../hocs/withParams';
import './product-description.scss';
import TextAttribute from '../../components/attributes/TextAttribute';
import { addProduct } from '../../features/cart/cartSlice';

class ProductDescription extends Component {
  componentDidMount() {
    const { productId } = this.props.params;
    this.props.getProductById(productId);
  }

  render() {
    const { name, inStock, brand, gallery, description, attributes, prices } =
      this.props.currentProduct;

    const { currentCurency, mainPhotoSrc, changeMainPhoto, changeActiveAttribute, addProduct } =
      this.props;

    const price = prices.find(item => item.currency.label === currentCurency.label);

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
                <img src={src} alt="item" />
              </div>
            );
          })}
        </div>
        <img src={mainPhotoSrc} alt="product" className="product-info__image" />
        <div className="product-info__description">
          <h3 className="product-info__brand brand-title">{brand}</h3>
          <div className="product-info__name name-title">{name}</div>
          <div className="product-info__attributes">
            {attributes.map(({ name, type, items, active, ...attr }) => {
              if (type === 'swatch') {
                return (
                  <ColorAttribute
                    cl="product-info__color-attribute"
                    key={attr.id}
                    productId={null}
                    name={name}
                    items={items}
                    active={active}
                    changeActiveAttribute={changeActiveAttribute}
                    attribute={attr}
                  />
                );
              }
              return (
                <TextAttribute
                  cl="product-info__text-attribute"
                  key={attr.id}
                  productId={null}
                  name={name}
                  items={items}
                  active={active}
                  changeActiveAttribute={changeActiveAttribute}
                  attribute={attr}
                />
              );
            })}

            <div className="attribute-price">
              <div className="attribute-price__title attribute-title">PRICE:</div>
              <div className="attribute-price__amount price-amount">
                {price ? `${price.currency.symbol}${price.amount}` : ''}
              </div>
            </div>
          </div>
          <button
            disabled={!inStock}
            onClick={() => addProduct(this.props.currentProduct)}
            className="product-info__cart-btn btn btn_green"
          >
            ADD TO CART
          </button>
          <div
            className="product-info__description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    currentProduct: currentProductSelector(state),
    mainPhotoSrc: mainPhotoSrcSelector(state),
    currentCurency: generalCurrencySelector(state),
  };
};

const mapDispatch = {
  getProductById,
  changeMainPhoto,
  changeActiveAttribute,
  addProduct,
};

export default connect(mapState, mapDispatch)(withParams(ProductDescription));
