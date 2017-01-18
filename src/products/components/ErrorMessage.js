import React from 'react';

import styles from '../products.sass';

export default class ErrorMessage extends React.PureComponent {
    render() {
        return (
            <div className={styles.error}>Sorry, something went wrong :(</div>
        );
    }
}