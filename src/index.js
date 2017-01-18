import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import Products from './products/Products.js';

import store from './redux/store.js';

import '../node_modules/bootstrap-css-only/css/bootstrap.css';
import './global.sass';

render((
    <Provider store={store}>
        <Products />
    </Provider>
), document.querySelector('.products'));