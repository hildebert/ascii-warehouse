import * as actions from '../actions.js';
import { assert } from 'chai';
import reducer, { initialState } from '../reducer.js';

const products = [
    { id: 'p1', price: 1, size: 1 },
    { id: 'p3', price: 3, size: 3 },
    { id: 'p2', price: 2, size: 2 }
];

const sortedProducts = products.sort((a, b) => a.price - b.price);

describe('Reducer', () => {
    it('processes triggerLoad action', () => {
        const resultState = Object.assign({}, initialState, { fetching: true });
        assert.deepEqual(reducer(initialState, actions.triggerLoad()), resultState);
    });

    it('processes showPrefetched action', () => {
        const startState = Object.assign({}, initialState, { prefetched: products });
        const resultState = Object.assign({}, initialState, { products: products });
        assert.deepEqual(reducer(startState, actions.showPrefetched()), resultState);
    });

    it('processes showPrefetched action with activated sorting', () => {
        const startState = Object.assign({}, initialState, { prefetched: products, currentOrder: 'price' });
        const resultState = Object.assign({}, initialState, { products: sortedProducts, currentOrder: 'price' });

        assert.deepEqual(reducer(startState, actions.showPrefetched()), resultState);
    });

    it('processes fetchStart action', () => {
        const resultState = Object.assign({}, initialState, { prefetching: true });
        assert.deepEqual(reducer(initialState, actions.fetchStart()), resultState);
    });

    it('processes fetchSuccess action', () => {
        const resultState = Object.assign({}, initialState, { prefetched: products });
        assert.deepEqual(reducer(initialState, actions.fetchSuccess(products)), resultState);
    });

    it('processes fetchFailure action', () => {
        const resultState = Object.assign({}, initialState, { error: 'error' });
        assert.deepEqual(reducer(initialState, actions.fetchFailure('error')), resultState);
    });

    it('processes fetchEnd action', () => {
        const startState = Object.assign({}, initialState, { prefetching: true });
        const resultState = Object.assign({}, initialState, { prefetching: false });
        assert.deepEqual(reducer(startState, actions.fetchEnd()), resultState);
    });

    it('processes orderBy', () => {
        const startState = Object.assign({}, initialState, { products, currentOrder: 'price' });
        const resultState = Object.assign({}, initialState, { products: sortedProducts, currentOrder: 'price' });
        assert.deepEqual(reducer(startState, actions.orderBy('price')), resultState);
    });
});
