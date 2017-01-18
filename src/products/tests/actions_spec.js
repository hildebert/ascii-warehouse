import * as actions from '../actions.js';
import { assert } from 'chai';

describe('Products actions', () => {
    it('fetch with default parameters', () => {
        assert.deepEqual(actions.fetch().payload, { limit: 25, offset: 0 });
    });

    it('fetch with custom parameters', () => {
        assert.deepEqual(actions.fetch(30, 25).payload, { limit: 30, offset: 25 });
    });

    it('triggerLoad', () => {
        assert(actions.triggerLoad().type.indexOf('Trigger load') > -1);
    });

    it('fetchSuccess', () => {
        const payload = ['p1', 'p2', 'p3'];
        assert.deepEqual(actions.fetchSuccess(payload).payload, payload);
    });

    it('fetchError', () => {
        const payload = ['p1', 'p2', 'p3'];
        assert.deepEqual(actions.fetchFailure('error').payload, 'error');
    });

    it('fetchEnd', () => {
        assert(actions.fetchEnd().type.indexOf('Fetch end') > -1);
    });

    it('showPrefetched', () => {
        assert(actions.showPrefetched().type.indexOf('Show prefetched') > -1);
    });

    it('triggerLoad', () => {
        assert(actions.triggerLoad().type.indexOf('Trigger load') > -1);
    });

    it('finish', () => {
        assert(actions.finish().type.indexOf('Finish') > -1);
    });
});

