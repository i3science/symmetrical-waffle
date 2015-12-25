import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'react-router';
import Routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
// import authenticationStore from '../stores/AuthenticationStore';
import routerStore from '../stores/RouterStore';

export default () => {
	routerStore.set(
		<Router history={createBrowserHistory()}>
			{Routes}
		</Router>
	);
    return routerStore.get();
};