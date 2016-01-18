import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'react-router';
import Routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
// import authenticationStore from '../stores/AuthenticationStore';
import routerStore from '../stores/RouterStore';

import Actions from '../actions/UiActions';
import AuthenticationActions from '../actions/AuthenticationActions';
// Import utilities to make them available
import '../utils/fetch';
import '../utils/String.js';
import '../utils/Object.js';

// Actions.initData();

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        if (typeof document !== 'undefined') {
        	routerStore.set(
        		<Router history={createBrowserHistory()}>
        			{Routes}
        		</Router>
        	);
        } else {
            routerStore.set(<Router>{Routes}</Router>);
        }
        return routerStore.get();
    }
};
export default App;