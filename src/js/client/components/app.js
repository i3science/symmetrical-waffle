import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'react-router';
import Routes from './routes.jsx';
import createBrowserHistory from 'history/lib/createBrowserHistory';

export default () => {
	return (
		<Router history={createBrowserHistory()}>
			{Routes()}
		</Router>
	);
};