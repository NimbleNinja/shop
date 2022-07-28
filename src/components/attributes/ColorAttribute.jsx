import React, { Component } from 'react';
import './attributes.scss';

class ColorAttribute extends Component {
  render() {
    const { name, items, productId, active, changeActiveAttribute, attribute, cl } = this.props;

    return (
      <div className="color-attribute">
        <div className="color-attribute__title attribute-title">{`${name}:`}</div>
        <div className="color-attribute__items">
          {items.map(({ id, value }) => {
            const classes = `color-attribute__item ${cl} ${
              active === value ? 'color-attribute__item_active' : ''
            }`;
            return (
              <div
                onClick={() =>
                  changeActiveAttribute({
                    productId,
                    attributeId: attribute.id,
                    attributeValue: value,
                  })
                }
                key={id}
                className={`color-attribute__item ${classes}`}
              >
                <div
                  style={{ background: `${value}` }}
                  className="color-attribute__item-square"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ColorAttribute;
