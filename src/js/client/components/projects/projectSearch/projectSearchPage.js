import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import InputText from '../../common/input/inputtext';
import CheckBox from '../../common/input/checkbox';
import projectActions from '../../../actions/ProjectActions';
import projectStore from '../../../stores/ProjectStore';
import { list_filter } from '../../../../shared/projects.js';
import ProjectResults from './projectResults';

class ProjectPage extends React.Component {
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
                    'pending',
                    'inmarket',
                    'closed'
                ]
            }
        };
        this._onChange = this._onChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }
    componentWillMount() {
        projectActions.refreshProjects();
        projectStore.addChangeListener(this._onChange);
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
    _handleChange(event) {
        if (event.target.type === 'checkbox') {
            if (event.target.checked) {
                this.state.filter.state.push(event.target.id);
            } else {
                _.pull(this.state.filter.state, event.target.id);
            }
        } else {
            this.state.filter[event.target.id] = event.target.value;
        }
        this.setState({filter: this.state.filter});
        this._filter();
    }
    render() {
        var keyword = this.state.filter.keyword,
            client = this.state.filter.client,
            active = _.includes(this.state.filter.state, 'active'),
            pending = _.includes(this.state.filter.state, 'pending'),
            inmarket = _.includes(this.state.filter.state, 'inmarket'),
            closed = _.includes(this.state.filter.state, 'closed');
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <div className="row center-align">
                        <h4 className="grey-text text-darken-2">Find a Project</h4>
                        <div className="col s10" style={{margin: '50px auto', float: 'none'}}>
                            <Link to="search" className="waves-effect waves-light btn-large"><i className="material-icons right">playlist_add</i>Start a Project</Link>
                            <div className="clearfix"></div>
                            <div className="row" style={{marginTop: '50px'}}>
                                <div className="col s6">
                                    <InputText
                                        id="client"
                                        label="Client"
                                        color="teal"
                                        placeholder="Start typing a client name"
                                        val={client}
                                        active={true}
                                        onChange={this._handleChange}
                                    />
                                </div>
                                <div className="col s6">
                                    <InputText
                                        id="keyword"
                                        label="Keyword"
                                        color="teal"
                                        placeholder="Start typing a keyword"
                                        val={keyword}
                                        active={true}
                                        onChange={this._handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col s8" style={{margin: '0 auto ', float: 'none'}}>
                            <div className="col s3">
                                <CheckBox
                                    id='pending'
                                    label='Pending'
                                    onChange={this._handleChange}
                                    checked={pending}
                                />
                            </div>
                            <div className="col s3">
                                <CheckBox
                                    id='active'
                                    label='Active'
                                    onChange={this._handleChange}
                                    checked={active}
                                />
                            </div>
                            <div className="col s3">
                                <CheckBox
                                    id='inmarket'
                                    label='In Market'
                                    onChange={this._handleChange}
                                    checked={inmarket}
                                />
                            </div>
                            <div className="col s3">
                                <CheckBox
                                    id='closed'
                                    label='Closed'
                                    onChange={this._handleChange}
                                    checked={closed}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <h5 className="center-align teal-text">{(this.state.projectResults && this.state.projectResults.length > 0) ? this.state.projectResults.length + ' results' : ''}</h5>
                <ProjectResults
                    projects={this.state.projectResults}
                />

            </div>
        );
    }
}

export default ProjectPage;