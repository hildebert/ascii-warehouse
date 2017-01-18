import React from 'react';
import moment from 'moment';

export default class DateComponent extends React.PureComponent {
    static propTypes = {
        source: React.PropTypes.string.isRequired
    };

    render() {
        const m = moment(this.props.source);
        const diff = Math.abs(m.diff(moment(), 'days'));
        return (
            <span>{diff > 6 ? m.format('YYYY-MM-DD, HH:mm') : m.fromNow()}</span>
        );
    }
}