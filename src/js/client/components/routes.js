import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute, Redirect } from 'react-router';
import Template from './template';
import Full from './FullScreen';
import SearchStart from './search/searchStart/searchStartPage';
import SearchInfluencer from './search/freeFormSearch/freeFormSearch';
import Results from './results/resultsPage';
import ProfilePage from './influencers/ProfilePage';
import Login from './login';
import ProjectSearchPage from './projects/search/ProjectSearchPage';
import ProjectPage from './projects/ProjectPage';
import NewProjectPage from './projects/new/CreateProjectPage';
import ListSearchPage from './lists/listStart/listsSearchPage';
import ListPage from './lists/list/listPage';
import PreferencesPage from './preferences/PreferencesPage';
import AccountEditPage from './preferences/accounts/AccountEditPage';
import AvailabilityPage from './preferences/availability/AvailabilityPage';
import InfluencerPrefsPage from './preferences/influencers/influencerPrefsPage';
import InfluencerCreatePage from './preferences/influencers/influencerCreatePage';
import InfluencerEditPage from './preferences/influencers/influencerEditPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import ResetPasswordPage from './auth/ResetPasswordPage';
import ElementPage from './elements/ElementPage';
import InfluencerElementPage from './elements/InfluencerElementPage';
import ClientPrefsPage from './preferences/clients/ClientPrefsPage';
import ClientEditPage from './preferences/clients/ClientEditPage';
import clientService from '../services/ClientService';

import influencerService from '../services/InfluencerService';

// Import utilities to make them available
import '../utils/fetch';
import '../utils/String.js';
import '../utils/Object.js';

export default (
		<div>
			<Redirect from='/' to='projects' />
			<Route path="/" component={Template} name="Home">
                <Route path="projects" name="Projects">
					<IndexRoute component={ProjectSearchPage} />
					<Route path="create" component={NewProjectPage} name="Create" />
					<Route path=":id" name="Project">
						<IndexRoute component={ProjectPage} name="Edit" />
						<Route path="element" component={InfluencerElementPage} name="Element" />
						<Route path="elements/:elementId" component={ElementPage} name="Element" />
					</Route>
				</Route>
				<Route path="search" name="Search">
					<IndexRoute component={SearchStart} />
					<Route path="influencer" component={SearchInfluencer} name="Freeform" />
					<Route path="results" name="Results">
						<IndexRoute component={Results} />
						<Route path="profile/:id" component={ProfilePage} name="Profile" />
					</Route>
				</Route>
				<Route path="lists" name="Lists">
					<IndexRoute component={ListSearchPage} />
					<Route path="list/:id" component={ListPage} name="List" />
				</Route>
				<Redirect from='preferences' to='preferences/myaccount' />
				<Route path="preferences" component={PreferencesPage}>
					<Route path="myaccount" component={AccountEditPage} name="Account">
					</Route>
					<Route path="influencers" name="Influencers">
						<IndexRoute component={InfluencerPrefsPage}/>
						<Route path="create" component={InfluencerCreatePage} service={influencerService} name="Create" />
						<Route path="profile/:id" component={ProfilePage} name="Profile" />
						<Route path="edit/:id" component={InfluencerEditPage} service={influencerService} name="Edit" />
					</Route>
					<Route path="clients" name="Clients">
						<IndexRoute component={ClientPrefsPage}/>
						<Route path="create" component={ClientEditPage} service={clientService} name="Create" />
						<Route path=":clientId" name="Client">
							<Route path="edit" component={ClientEditPage} service={clientService} name="Edit" />
						</Route>
					</Route>
					<Route path="availability" name="Availability" component={AvailabilityPage}/>
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