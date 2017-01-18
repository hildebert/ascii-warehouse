import { takeEvery } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';

import * as actions from './actions.js';
import api from '../util/api.js';

const selectPrefetched = state => state.products.prefetched;
const selectLength = state => state.products.products.length;
const selectPerPage = state => state.products.perPage;

/**
 * This is the main saga. When we need to show more items,
 * it checks if we have prefetched items and shows them, or
 * starts loading items from the server.
 *
 * After a chunk of items is shown, it prefetches the
 * next chunk.
 *
 * @param offset
 * @param perPage
 * @param prefetched
 */
export function * triggerLoad(offset, perPage, prefetched) {
    try {
        // show 50 items on first load
        const limit = offset ? perPage : 50;
        // this value will be used to calculate the offset of next fetchProducts run
        let addedLength = prefetched.length;
        let products;

        // if we don't have some items prefetched - fetch them from server
        if (!prefetched.length) {
            products = yield call(fetchProducts, actions.fetch(limit, offset));
            addedLength = products && products.length || 0;
        }

        // show prefetched items
        yield put(actions.showPrefetched());

        // simulate catalog's end if 500+ items are shown
        if (offset > 500) {
            products = [];
            // prefetch more items
        } else {
            products = yield call(fetchProducts, actions.fetch(perPage, offset + addedLength));
        }

        // if no products were fetched, dispatch a finish action
        if (!products.length) {
            yield put(actions.finish());
        }
    } catch (e) {
        //console.log('triggerLoad ERRROROROROR');
        yield put(actions.fetchFailure(e));
    } finally {
        yield put(actions.fetchEnd());
    }
}

/**
 * Watcher saga. Does not run triggerLoad saga if previous run
 * is not yet completed, opposite of takeLatest
 */
export function * triggerLoadSaga() {
    while (yield take(actions.triggerLoad.getType())) {
        const [offset, perPage, prefetched] = yield [
            select(selectLength),
            select(selectPerPage),
            select(selectPrefetched)
        ];

        yield call(triggerLoad, offset, perPage, prefetched);
    }
}

/**
 * This saga makes a trip to server, fetches items
 * and stores them as prefetched.
 *
 * @param action
 */
export function * fetchProducts(action) {
    const { limit, offset } = action.payload;

    try {
        yield put(actions.fetchStart());

        const products = yield call(api.products, limit, offset);

        if (!products) {
            throw new Error(products);
        }

        yield put(actions.fetchSuccess(products));

        return products;
    } catch (e) {
        //console.log('fetchProducts ERRROROROROR');
        yield put(actions.fetchFailure(e));
    } finally {
        console.log('request end');
        yield put(actions.fetchEnd());
    }
}

export function * productsFetchSaga() {
    yield takeEvery(actions.fetch.getType(), fetchProducts);
}