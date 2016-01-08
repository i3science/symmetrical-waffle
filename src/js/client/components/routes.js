import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router';
import Template from './template';
import Full from './FullScreen';
import SearchPage from './search/searchPage';
import Serp from './serp/serpPage';
import Profile from './profile/profilePage';
import Login from './login';
import Projects from './projects/projectPage';
import Preferences from './preferences/preferences';
import AccountEdit from './account/edit';

export default (
		<div>
			<Route path="/" component={Template}>
				<IndexRoute component={SearchPage} />
                <Route path="dashboard/projects" component={Projects} />
				<Route path="profile/:id" component={Profile} />
				<Route path="search" component={SearchPage} />
				<Route path="search/results" component={Serp} />
				<Route path="search/results/profile/:id" component={Profile} />
				<Route path="prefs" component={Preferences}>
					<Route path="account/:id">
						<Route path="edit" component={AccountEdit} />
					</Route>
				</Route>
			</Route>
			<Route path="login" component={Full}>
				<IndexRoute component={Login} />
			</Route>
		</div>
);