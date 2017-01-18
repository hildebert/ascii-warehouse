import React from 'react';

import styles from '../products.sass';

export default class Ordering extends React.PureComponent {
    static propTypes = {
        options: React.PropTypes.array.isRequired,
        currentOrder: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ]),
        onSelect: React.PropTypes.func.isRequired
    };

    render() {
        const { options, currentOrder, onSelect } = this.props;

        return (
            <div className={styles.ordering}>
                <div className='btn-group'>
                    {options.map((item, index) => (
                        <button key={index} className={'btn ' + (item.field === currentOrder ? 'btn-primary' : 'btn-default')} onClick={() => onSelect(item.field)}>{item.label}</button>
                    ))}
                </div>
            </div>
        );
    }
}