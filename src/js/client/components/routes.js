import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router';
import Template from './template';
import Full from './FullScreen';
import SearchPage from './search/searchPage';
import Serp from './serp/serpPage';
import ProfilePage from './influencers/ProfilePage';
import Login from './login';
import Projects from './projects/projectPage';
import PreferencesPage from './preferences/PreferencesPage';
import AccountEditPage from './preferences/accounts/AccountEditPage';
import InfluencerPrefsPage from './preferences/influencers/InfluencerPrefsPage';
import influencerService from '../services/InfluencerService';

export default (
		<div>
			<Route path="/" component={Template}>
				<IndexRoute component={SearchPage} />
                <Route path="dashboard/projects" component={Projects} />
				<Route path="search" component={SearchPage} />
				<Route path="search/results" component={Serp} />
				<Route path="search/results/profile/:id" component={ProfilePage} />
				<Route path="prefs" component={PreferencesPage}>
					<Route path="accounts/:id" component={AccountEditPage}/>
					<Route path="influencers">
						<IndexRoute component={InfluencerPrefsPage}/>
						<Route path="create" component={AccountEditPage} service={influencerService}/>
					</Route>
				</Route>
			</Route>
			<Route path="login" component={Full}>
				<IndexRoute component={Login} />
			</Route>
		</div>
);