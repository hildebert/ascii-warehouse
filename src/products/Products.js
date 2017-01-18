import React from 'react';
import { connect } from 'react-redux';
import ProductsList from './components/ProductsList.js';
import FinishedMessage from './components/FinishedMessage.js';
import ErrorMessage from './components/ErrorMessage.js';
import Ordering from './components/Ordering.js';
import LoadingTrigger from '../components/LoadingTrigger/LoadingTrigger.js';
import Loader from '../components/Loader/Loader.js';
import Banner from '../components/Banner/Banner.js';

import getRandForBanner from '../util/getRandForBanner.js';
import { triggerLoad, orderBy } from './actions.js';

export class Products extends React.Component {
    static propTypes = {
        products: React.PropTypes.array.isRequired,
        fetching: React.PropTypes.bool.isRequired,
        finished: React.PropTypes.bool.isRequired,
        currentOrder: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ]),
        orderOptions: React.PropTypes.array.isRequired,
        bannerEvery: React.PropTypes.number.isRequired,
        triggerLoad: React.PropTypes.func.isRequired,
        orderBy: React.PropTypes.func.isRequired,
        error: React.PropTypes.any
    };

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    /**
     * Function is passed to ProductsList component and
     * add a banner after every X products
     * @param content
     * @param index
     * @return {*[]}
     */
    renderItem(content, index) {
        const retval = [content];

        if (index > 1 && (index + 1) % this.props.bannerEvery === 0) {
            retval.push(<Banner key={index + 'banner'} rand={getRandForBanner(index)} />);
        }

        return retval;
    }

    render() {
        const { products, fetching, finished, triggerLoad, orderBy, currentOrder, orderOptions, error } = this.props;

        return (
            <div>
                {products.length ? <Ordering onSelect={orderBy} currentOrder={currentOrder} options={orderOptions} /> : null}
                <ProductsList products={products} renderItem={this.renderItem} currentOrder={currentOrder} />
                {fetching ? <Loader size={100} /> : null}
                {!finished && !error ? <LoadingTrigger onVisible={triggerLoad} /> : null}
                {finished ? <FinishedMessage /> : null}
                {error ? <ErrorMessage /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    fetching: state.products.fetching,
    finished: state.products.finished,
    bannerEvery: state.products.bannerEvery,
    currentOrder: state.products.currentOrder,
    orderOptions: state.products.orderOptions,
    error: state.products.error
});

export default connect(mapStateToProps, {
    triggerLoad,
    orderBy
})(Products);
