import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import {
  browserHistory
} from 'react-router';
import {
  syncHistoryWithStore
} from 'react-router-redux';

import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-table/css/toastr.css';
import './node_modules/jquery/dist/jquery.js';
import './node_modules/bootstrap/dist/js/bootstrap.js';
import './node_modules/bootstrap/dist/css/bootstrap.css';
import './node_modules/react-bootstrap-table/dist/react-bootstrap-table.js';
import './node_modules/react-redux-toastr/lib/css/react-redux-toastr.css';
import './src/client/styles/styles.css';

import Root from './src/client/containers/Root';
import configureStore from './src/client/store/configureStore';

console.info('Server environment', process.env.NODE_ENV);
console.info('isProduction', process.env.NODE_ENV === 'production');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
);

module.hot.accept();
