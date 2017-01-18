import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer.js';
import saga from './saga.js';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(saga);