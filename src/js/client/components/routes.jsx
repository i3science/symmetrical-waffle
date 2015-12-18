import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Template from './template';
import SearchPage from './search/searchPage';
import Serp from './serp/serpPage';
import Profile from './profile/profilePage';

export default () => {
	return (
		<Route path="/" component={Template}>
			<IndexRoute component={Serp} />
			<Route path="profile/:id" component={Profile} />
			<Route path="results/profile/:id" component={Profile} />
			<Route path="results" component={Serp} />
			<Route path="search" component={SearchPage} />
		</Route>
	);
}