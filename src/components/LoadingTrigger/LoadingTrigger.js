import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import styles from './trigger.sass';

export default class LoadingTrigger extends React.Component {
    static propTypes = {
        onVisible: React.PropTypes.func.isRequired
    };

    onVisible(isVisible) {
        if (isVisible) {
            this.props.onVisible();
        }
    }

    render() {
        return (
            <div className={styles.trigger}>
                <VisibilitySensor onChange={this.onVisible.bind(this)} delay={250} />
            </div>
        );
    }
}