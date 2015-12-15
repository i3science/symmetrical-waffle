import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Actions from './actions/actions';

Actions.initData();

ReactDOM.render(<App />, document.getElementById('main'));