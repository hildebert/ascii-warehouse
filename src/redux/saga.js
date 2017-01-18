import { productsFetchSaga, triggerLoadSaga } from '../products/sagas.js';

export default function* saga() {
    yield [
        triggerLoadSaga(),
        productsFetchSaga()
    ];
}