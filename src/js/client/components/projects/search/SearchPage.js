import React from 'react';
import projectActions from '../../../actions/ProjectActions';
import projectStore from '../../../stores/ProjectStore';
import { list_filter } from '../../../../shared/projects.js';
import ProjectResults from './Results';
import ProjectListFilters from './Filters';
import authenticationStore from '../../../stores/AuthenticationStore';
import Calendar from '../../influencers/profile/calendar';

export default class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            projectResults: [],
            projects: [],
            filter: {
                client: '',
                keyword: '',
                state: [
                    'active',
                    'inmarket'
                ]
            }
        };
        this._onChange = this._onChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
        this._filter = this._filter.bind(this);
    }
    componentDidMount() {
        projectStore.addChangeListener(this._onChange);
        projectActions.refreshProjects();
    }

    componentWillUnmount() {
        projectStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            projects: projectStore.getProjects()
        });
        this._filter();
    }
    _filter() {
        this.state.projectResults = list_filter(this.state.projects, this.state.filter);
        this.setState({projectResults: this.state.projectResults});
    }

    _onFilterChange(filters) {
        this.setState({filter: filters});
        this._filter();
    }

    render() {
        let user = authenticationStore.getCurrentUser();
        let filterClient = user && (user.roles.indexOf('admin') > -1 || user.roles.indexOf('organizer') > -1);
        let calendar = user && user.roles.indexOf('influencer') > -1 ? (
            <div className="card-panel">
                <Calendar
                    id="project_search_calendar"
                    full
                    disabled
                    dates={user.availability} />
            </div>
        ) : '';
        return (
            <div>
                <ProjectListFilters onChange={this._onFilterChange} filterClient={filterClient} filter={this.state.filter} />
                {calendar}
                <ProjectResults projects={this.state.projectResults} />
            </div>
        );
    }
}