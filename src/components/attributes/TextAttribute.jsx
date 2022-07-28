import React, { Component } from 'react';
import './attributes.scss';

class TextAttribute extends Component {
  render() {
    const { name, items, productId, active, changeActiveAttribute, attribute, cl } = this.props;

    return (
      <div key={attribute.id} className="text-attribute">
        <h4 className="text-attribute__title attribute-title">{`${name}:`}</h4>
        <div className="text-attribute__items">
          {items.map(({ id, value }) => {
            const classes = `text-attribute__item ${cl} ${
              active === value ? 'text-attribute__item_active' : ''
            }`;
            return (
              <span
                onClick={() =>
                  changeActiveAttribute({
                    productId,
                    attributeId: attribute.id,
                    attributeValue: value,
                  })
                }
                key={id}
                className={classes}
              >
                {value}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TextAttribute;
