import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Actions from './actions/UiActions';
import AuthenticationActions from './actions/AuthenticationActions';

Actions.initData();

ReactDOM.render(<App />, document.getElementById('main'));