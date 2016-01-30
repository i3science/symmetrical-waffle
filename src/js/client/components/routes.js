import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router';
import Template from './template';
import Full from './FullScreen';
import SearchStart from './search/searchStartPage';
import SearchInfluencer from './search/searchInfluencer';
import Results from './results/resultsPage';
import ProfilePage from './influencers/ProfilePage';
import Login from './login';
import Projects from './projects/projectPage';
import Lists from './lists/listsSearchPage';
import List from './lists/list';
import PreferencesPage from './preferences/PreferencesPage';
import AccountEditPage from './preferences/accounts/AccountEditPage';
import InfluencerCreatePage from './preferences/influencers/influencerCreatePage';
import InfluencerPrefsPage from './preferences/influencers/InfluencerPrefsPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import ResetPasswordPage from './auth/ResetPasswordPage';

import influencerService from '../services/InfluencerService';

// Import utilities to make them available
import '../utils/fetch';
import '../utils/String.js';
import '../utils/Object.js';

export default (
		<div>
			<Route path="/" component={Template} name="Home">
                <Route path="projects" component={Projects} name="Projects" />
				<Route path="search" name="Search">
					<IndexRoute component={SearchStart} />
					<Route path="influencer" component={SearchInfluencer} name="Influencers" />
					<Route path="results" name="Results">
						<IndexRoute component={Results} />
						<Route path="profile/:id" component={ProfilePage} name="Profile" />
					</Route>
				</Route>
				<Route path="lists" component={Lists} name="Lists" />
				<Route path="list/:id" component={List} name="List" />
				<Route path="preferences" component={PreferencesPage} name="Preferences">
					<Route path="accounts/:id" name="Account">
						<Route path="edit" component={AccountEditPage} name="Edit" />
					</Route>
					<Route path="influencers" name="Influencers">
						<IndexRoute component={InfluencerPrefsPage}/>
						<Route path="create" component={InfluencerCreatePage} service={influencerService} name="Create" />
					</Route>
				</Route>
			</Route>
			<Route path="login" component={Full}>
				<IndexRoute component={Login} />
			</Route>
			<Route path="security">
				<Route path="forgot-password" component={ForgotPasswordPage} />
				<Route path="reset-password" component={ResetPasswordPage} />
			</Route>
		</div>
);