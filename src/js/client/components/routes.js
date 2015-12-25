import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router';

import Template from './template';
import SearchPage from './search/searchPage';
import Serp from './serp/serpPage';
import Profile from './profile/profilePage';
import Login from './login';

export default (
	<Route path="/" component={Template}>
		<IndexRoute component={SearchPage} />
		<Route path="profile/:id" component={Profile} />
		<Route path="results/profile/:id" component={Profile} />
		<Route path="results" component={Serp} />
		<Route path="search" component={SearchPage} />

        <Route path="login" component={Login} />
	</Route>
);