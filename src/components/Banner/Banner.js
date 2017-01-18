import React from 'react';

import styles from './banner.sass';

export default class Banner extends React.PureComponent {
    static propTypes = {
        rand: React.PropTypes.number.isRequired
    };

    render() {
        return (
            <img className={styles.banner + ' ad'} src={`/ad/?r=${this.props.rand}`} />
        );
    }
}
