import React from 'react';
import Template from './template';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Search from './search';
import Serp from './serp/serpPage';
import Profile from './profile/profilePage';
// <Router history={createBrowserHistory()}>
export default () => {
	return (
		<Router history={createBrowserHistory()}>
			<Route path="/" component={Template}>
				<IndexRoute component={Serp} />
				<Route path="profile/:id" component={Profile} />
				<Route path="serp" component={Serp} />
				<Route path="search" component={Search} />
			</Route>
		</Router>
	);
};