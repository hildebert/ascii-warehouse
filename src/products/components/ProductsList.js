import React from 'react';
import Product from './Product.js';

import styles from '../products.sass';

export default class ProductsList extends React.PureComponent {
    static propTypes = {
        products: React.PropTypes.array.isRequired,
        renderItem: React.PropTypes.func.isRequired,
        // isn't actually used, but needed so that PureComponent
        // will rerender itself on order change
        currentOrder: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ])
    };

    static defaultProps = {
        renderItem: x => x
    };

    render() {
        const { products, renderItem } = this.props;

        return (
            <div className={styles.list}>
                {products.map((item, index) => renderItem(<Product key={index} {...item} />, index))}
            </div>
        );
    }
}