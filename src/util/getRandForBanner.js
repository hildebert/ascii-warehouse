let values = [];
let randoms = [];
let maxIndex = -1;

/**
 * Generates random
 * Make sure that banner receives different random number
 * than previous time. If rand value has already been
 * generated for this index, return it so existing banners
 * are not changed.
 *
 * @param {Number} index
 * @returns {Number} rand
 */
export default function(index) {
    if (!randoms[index]) {
        let rand;
        let n;
        let max = 16;
        let prev = values[maxIndex];

        do {
            rand = Math.floor(Math.random() * 1000);

            let r = parseInt(rand, 10) || 0;
            n = (r % max) + 1;
        } while (n === prev);

        values[index] = n;
        randoms[index] = rand;
        maxIndex = Math.max(index, maxIndex);
    }

    return randoms[index];
};