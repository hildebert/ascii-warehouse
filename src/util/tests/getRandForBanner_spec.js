import getRandForBanner from '../getRandForBanner.js';
import { assert } from 'chai';

describe('getRandForBanner', () => {
    it('does not generate same number in a row', () => {
        let prev = -1;
        var i;

        // contiguous indexes
        for (i = 0; i < 100; i++) {
            let value = getRandForBanner(i);
            assert.notEqual(value, prev);
            prev = value;
        }

        prev = -1;

        // indexes with step = 20
        for (i = 0; i < 2000; i += 20) {
            let value = getRandForBanner(i);
            assert.notEqual(value, prev);
            prev = value;
        }
    });

    it('return same rand number for same index', () => {
        assert.equal(getRandForBanner(42), getRandForBanner(42));
    });
});