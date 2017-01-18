import { createReducer } from 'redux-act';
import * as actions from './actions.js';

export const initialState = {
    products: [], // displayed products
    prefetched: [], // prefetched products
    prefetching: false, // true is prefetching in underway
    fetching: false, // true if we don't have prefetched items and have to display spinner waiting for request to finish
    error: false, // contains error if it occurs somewhere in fetching process
    perPage: 30, // number of product to fetch on each load
    bannerEvery: 20, // show banner every X products
    finished: false, // true if all products were loaded
    currentOrder: false, // current order field
    orderOptions: [ // order options
        { label: 'No order', field: false },
        { label: 'By id', field: 'id' },
        { label: 'By price', field: 'price' },
        { label: 'By size', field: 'size' }
    ]
};

/**
 * Returns comparator for `sort` method with predefined field
 * @param field
 * @return {Function}
 */
const getComparator = field => (a, b) => a[field] > b[field] ? 1 : -1;

export default createReducer({
    [actions.triggerLoad]: state => {
        return Object.assign({}, state, {fetching: true});
    },
    /**
     * Merge prefetched products with active ones. If sorting is
     * activated - apply it to final list
     */
    [actions.showPrefetched]: state => {
        let products = state.products.concat(state.prefetched);

        // sort new list if sort is applied
        if (state.currentOrder) {
            products = products.sort(getComparator(state.currentOrder));
        }

        return Object.assign({}, state, {
            products: products,
            prefetched: [],
            fetching: false
        });
    },
    [actions.fetchStart]: state => Object.assign({}, state, {prefetching: true}),
    [actions.fetchSuccess]: (state, products) => Object.assign({}, state, { prefetched: products }),
    [actions.fetchFailure]: (state, error) => Object.assign({}, state, {error: error}),
    [actions.fetchEnd]: state => Object.assign({}, state, { prefetching: false, fetching: false }),
    [actions.finish]: state => Object.assign({}, state, { finished: true }),
    /**
     * Change order parameter
     */
    [actions.orderBy]: (state, currentOrder) => Object.assign({}, state, {
        currentOrder,
        products: currentOrder ? state.products.sort(getComparator(currentOrder)) : state.products
    })
}, initialState);