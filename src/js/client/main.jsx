import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

if (typeof document !== 'undefined') {
    ReactDOM.render(<App />, document.getElementById('main'));
}