import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Actions from './actions/UiActions';
import AuthenticationActions from './actions/AuthenticationActions';

// Import utilities to make them available
import './utils/fetch';
import './utils/String.js';
import './utils/Object.js';

Actions.initData();

ReactDOM.render(<App />, document.getElementById('main'));