import React from 'react';
import { Router } from 'react-router';
import Routes from './routes.jsx';
import createBrowserHistory from 'history/lib/createBrowserHistory';
// <Router history={createBrowserHistory()}>
export default () => {
	return (
		<Router history={createBrowserHistory()}>
			{Routes()}
		</Router>
	);
};