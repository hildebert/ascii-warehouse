import accounting from 'accounting-js';

export default function formatMoney(value) {
    return accounting.formatMoney(value);
};