import { assert } from 'chai';
import { call, put } from 'redux-saga/effects';

import { fetchProducts, triggerLoad } from '../sagas.js';
import * as actions from '../actions.js';
import api from '../../util/api.js';

describe('fetchProducts saga', () => {
    let fetchProductsGenerator;
    const limit = 50;
    const offset = 10;

    beforeEach(() => {
        fetchProductsGenerator = fetchProducts(actions.fetch(limit, offset));
    });

    it('should dispatch fetchStart action in the beginning', () => {
        assert.deepEqual(fetchProductsGenerator.next().value, put(actions.fetchStart()));
    });

    it('should dispatch api.products', () => {
        fetchProductsGenerator.next();
        assert.deepEqual(fetchProductsGenerator.next().value, call(api.products, limit, offset));
    });

    it('should dispatch fetchSuccess call with correct products', () => {
        const products = ['p1', 'p2', 'p3'];
        fetchProductsGenerator.next();
        fetchProductsGenerator.next();
        assert.deepEqual(fetchProductsGenerator.next(products).value, put(actions.fetchSuccess(products)));
    });

    it('should dispatch fetchFailure action if something goes wrong', () => {
        fetchProductsGenerator.next();
        fetchProductsGenerator.next();
        const response = { error: 1 };
        assert.deepEqual(fetchProductsGenerator.throw(response).value, put(actions.fetchFailure(response)));
    });

    it('should dispatch fetchEnd in the end', () => {
        fetchProductsGenerator.next();
        fetchProductsGenerator.next();
        fetchProductsGenerator.throw('error');
        assert.deepEqual(fetchProductsGenerator.next().value, put(actions.fetchEnd()));
    });
});

describe('triggerLoad saga', () => {
    it('should run fetchProducts saga if prefetched array is empty', () => {
        const triggerLoadGenerator = triggerLoad(30, 30, []);
        assert.deepEqual(triggerLoadGenerator.next().value, call(fetchProducts, actions.fetch(30, 30)));
    });

    it('should dispatch showPrefetched action if prefetched array is not empty', () => {
        const triggerLoadGenerator = triggerLoad(30, 30, [1, 1, 1]);
        assert.deepEqual(triggerLoadGenerator.next().value, put(actions.showPrefetched()));
    });

    it('should run fetchProducts saga to prefetch next batch of products', () => {
        const prefetched = [1, 1, 1];
        const triggerLoadGenerator = triggerLoad(30, 30, prefetched);
        triggerLoadGenerator.next();
        assert.deepEqual(triggerLoadGenerator.next().value, call(fetchProducts, actions.fetch(30, 30 + prefetched.length)));
    });

    it('should dispatch finish action if end of catalog is reached', () => {
        const triggerLoadGenerator = triggerLoad(1000, 30, [1, 1, 1]);
        triggerLoadGenerator.next();
        assert.deepEqual(triggerLoadGenerator.next().value, put(actions.finish()));
    });
});