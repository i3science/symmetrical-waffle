import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router';
import Template from './template';
import Full from './FullScreen';
import SearchStart from './search/searchStart/searchStartPage';
import SearchInfluencer from './search/freeFormSearch/freeFormSearch';
import Results from './results/resultsPage';
import ProfilePage from './influencers/ProfilePage';
import Login from './login';
import ProjectSearchPage from './projects/projectSearch/projectSearchPage';
import ProjectPage from './projects/project/projectPage';
import ListSearchPage from './lists/listStart/listsSearchPage';
import ListPage from './lists/list/listPage';
import PreferencesPage from './preferences/PreferencesPage';
import AccountEditPage from './preferences/accounts/AccountEditPage';
import InfluencerPrefsPage from './preferences/influencers/influencerPrefsPage';
import InfluencerCreatePage from './preferences/influencers/influencerCreatePage';
import InfluencerEditPage from './preferences/influencers/influencerEditPage';
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
				<IndexRoute component={ProjectSearchPage} name="Projects"/>
                <Route path="projects" name="Projects">
					<IndexRoute component={ProjectSearchPage} />
					<Route path=":id" component={ProjectPage} name="Edit" />
				</Route>
				<Route path="search" name="Search">
					<IndexRoute component={SearchStart} />
					<Route path="influencer" component={SearchInfluencer} name="Influencers" />
					<Route path="results" name="Results">
						<IndexRoute component={Results} />
						<Route path="profile/:id" component={ProfilePage} name="Profile" />
					</Route>
				</Route>
				<Route path="lists" name="Lists">
					<IndexRoute component={ListSearchPage} />
					<Route path="list/:id" component={ListPage} name="List" />
				</Route>
				<Route path="preferences" component={PreferencesPage} name="Preferences">
					<Route path="accounts" name="Account">
						<IndexRoute component={AccountEditPage}/>
						<Route path="edit/:id" component={AccountEditPage} name="Edit" />
					</Route>
					<Route path="influencers" name="Influencers">
						<IndexRoute component={InfluencerPrefsPage}/>
						<Route path="create" component={InfluencerCreatePage} service={influencerService} name="Create" />
						<Route path="profile/:id" component={ProfilePage} name="Profile" />
						<Route path="edit/:id" component={InfluencerEditPage} service={influencerService} name="Edit" />
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