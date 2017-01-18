import { createAction } from 'redux-act';

export const triggerLoad = createAction('Trigger load');

export const showPrefetched = createAction('Show prefetched');

export const fetch = createAction('Fetch products', (limit = 25, offset = 0) => ({ limit, offset }));
export const fetchStart = createAction('Fetch start');
export const fetchSuccess = createAction('Fetch success', (products = []) => products);
export const fetchFailure = createAction('Fetch failure', error => error);
export const fetchEnd = createAction('Fetch end');

export const orderBy = createAction('Finish', field => field);

export const finish = createAction('Finish');
