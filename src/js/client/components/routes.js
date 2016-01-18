import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router';
import Template from './template';
import Full from './FullScreen';
import SearchStart from './search/searchStartPage';
import SearchPage from './search/searchPage';
import Serp from './serp/serpPage';
import ProfilePage from './influencers/ProfilePage';
import Login from './login';
import Projects from './projects/projectPage';
import PreferencesPage from './preferences/PreferencesPage';
import AccountEditPage from './preferences/accounts/AccountEditPage';
import InfluencerPrefsPage from './preferences/influencers/InfluencerPrefsPage';
import influencerService from '../services/InfluencerService';

// Import utilities to make them available
import '../utils/fetch';
import '../utils/String.js';
import '../utils/Object.js';

export default (
		<div>
			<Route path="/" component={Template} name="Home">
                <Route path="dashboard/projects" component={Projects} name="Projects" />
				<Route path="search" name="Search">
					<IndexRoute component={SearchStart} />
					<Route path="influencer" component={SearchPage} name="Influencers" />
					<Route path="results" name="Results">
						<IndexRoute component={Serp} />
						<Route path="profile/:id" component={ProfilePage} name="Profile" />
					</Route>
				</Route>
				<Route path="prefs" component={PreferencesPage} name="Preferences">
					<Route path="accounts/:id" name="Account">
						<Route path="edit" component={AccountEditPage} name="Edit" />
					</Route>
					<Route path="influencers" name="Influencers">
						<IndexRoute component={InfluencerPrefsPage}/>
						<Route path="create" component={AccountEditPage} service={influencerService} name="Create" />
					</Route>
				</Route>
			</Route>
			<Route path="login" component={Full}>
				<IndexRoute component={Login} />
			</Route>
		</div>
);