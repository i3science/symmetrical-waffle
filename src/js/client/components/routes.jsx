import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Template from './template';
import Search from './search';
import Serp from './serp/serpPage';
import Profile from './profile/profilePage';

export default () => {
	return (
		<Route path="/" component={Template}>
			<IndexRoute component={Serp} />
			<Route path="profile/:id" component={Profile} />
			<Route path="serp" component={Serp} />
			<Route path="search" component={Search} />
		</Route>
	);
}