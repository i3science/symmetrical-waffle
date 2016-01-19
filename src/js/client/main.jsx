import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Actions from './actions/UiActions';

Actions.initData();

if (typeof document !== 'undefined') {
    ReactDOM.render(<App />, document.getElementById('main'));
}