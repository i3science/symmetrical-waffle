import React from 'react';
import projectActions from '../../../actions/ProjectActions';
import Actions from '../../../actions/UiActions';
import projectStore from '../../../stores/ProjectStore';
import { list_filter } from '../../../../shared/projects.js';
import ProjectResults from './Results';
import Card from '../../common/Card';
import ProjectCalendar from './../common/ProjectCalendar';
import ProjectListFilters from './Filters';
import authenticationStore from '../../../stores/AuthenticationStore';

export default class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            projectResults: [],
            projects: [],
            dates: [],
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
    componentWillMount() {
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
        for (var project in this.state.projects) {
            Actions.getProjectDates(this.state.projects[project], (dates) => {
                this.state.dates = this.state.dates.concat(dates);
                this.setState({ dates: this.state.dates });
            });
        }
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
            <Card title="Dates">
                <ProjectCalendar
                    events={this.state.dates}
                    dates={user.availability}
                />
            </Card>
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