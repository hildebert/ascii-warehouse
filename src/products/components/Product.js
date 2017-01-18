import React from 'react';
import DateComponent from '../../components/Date/Date.js';
import formatMoney from '../../util/formatMoney.js';

import styles from '../products.sass';

export default class Product extends React.PureComponent {
    static propTypes = {
        id: React.PropTypes.string.isRequired,
        size: React.PropTypes.number.isRequired,
        price: React.PropTypes.number.isRequired,
        face: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired
    };

    render() {
        const { id, size, price, face, date } = this.props;
        const style = { fontSize: size };

        return (
            <div className={styles.item}>
                <div className={styles.face} style={style}>
                    {face}
                </div>

                <div className={styles.price}>
                    {formatMoney(price / 100)}
                </div>

                <div className={styles.date}>
                    <DateComponent source={date} />
                </div>

                <div className={styles.id}>
                    {id}
                </div>
            </div>
        );
    }
}