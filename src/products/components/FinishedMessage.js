import React from 'react';

import styles from '../products.sass';

export default class FinishedMessage extends React.PureComponent {
    render() {
        return (
            <div className={styles.finished}>~ end of catalogue ~</div>
        );
    }
}