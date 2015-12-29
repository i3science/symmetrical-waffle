import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router';
import Template from './template';
import Full from './fullscreen';
import SearchPage from './search/searchPage';
import Serp from './serp/serpPage';
import Profile from './profile/profilePage';
import Login from './login';

export default (
		<div>
			<Route path="/" component={Template}>
				<IndexRoute component={SearchPage} />
				<Route path="profile/:id" component={Profile} />
				<Route path="search" component={SearchPage} />
				<Route path="search/results" component={Serp} />
				<Route path="search/results/profile/:id" component={Profile} />
			</Route>
			<Route path="login" component={Full}>
				<IndexRoute component={Login} />
			</Route>
		</div>
);