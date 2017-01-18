import formatMoney from '../formatMoney.js';
import { assert } from 'chai';

describe('formatMoney', () => {
    it('formats money', () => {
        assert.equal(formatMoney(5.02), '$5.02');
        assert.equal(formatMoney(100000), '$100,000.00');
    });
});

