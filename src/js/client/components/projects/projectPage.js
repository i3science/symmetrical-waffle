import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import InputText from '../elements/inputtext';
import CheckBox from '../elements/checkbox';
import projectActions from '../../actions/ProjectActions';
import projectStore from '../../stores/ProjectStore';
import moment from 'moment';
import { list_filter } from '../../../shared/projects.js';

const Result = (props) => {
    let amplifiers = Object.keys(props.project.required_influencers).reduce((obj, val) => {
        obj += props.project.required_influencers[val];
        return obj;
    }, 0);
    return (
        <div className="col m3 s2">
            <div className="card">
                <div className="card-content">
                    <span className="card-title teal-text text-darken-1">{props.project.client}</span>
                    <p><strong>{props.project.name}</strong></p>
                    <p>Amplifiers: {amplifiers}</p>
                    <p>Live Date: {moment(props.project.project_live).format('DD/MM/YYYY')}</p>
                </div>
                <div className="card-action grey lighten-5">
                    <Link to="">More Info...</Link>
                </div>
            </div>
        </div>
    );
};

class Results extends React.Component {
    render() {
        let results = this.props.projects.map((item, index) => {
            return (
                <Result key={index}
                        project={item}
                />
            );
        });
        return (
            <div className="">
                <div className="row">
                    {results}
                </div>
            </div>
        );
    }
}

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
        this.handleChange = this.handleChange.bind(this);
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
    handleChange(event) {
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
            active = _.contains(this.state.filter.state, 'active'),
            pending = _.contains(this.state.filter.state, 'pending'),
            inmarket = _.contains(this.state.filter.state, 'inmarket'),
            closed = _.contains(this.state.filter.state, 'closed');
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <div className="row center-align">
                        <h4 className="grey-text text-darken-2">Find a Project</h4>
                        <div className="col s10" style={{margin: '0 auto', float: 'none'}}>
                            <div className="row" style={{marginTop: '50px'}}>
                                <div className="col s6">
                                    <InputText
                                        id="client"
                                        label="Client"
                                        color="teal"
                                        placeholder="Start typing a client name"
                                        val={client}
                                        active={true}
                                        onChange={this.handleChange}
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
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col s8" style={{margin: '0 auto ', float: 'none'}}>
                            <div className="col s3">
                                <CheckBox
                                    id='pending'
                                    label='Pending'
                                    onChange={this.handleChange}
                                    checked={pending}
                                />
                            </div>
                            <div className="col s3">
                                <CheckBox
                                    id='active'
                                    label='Active'
                                    onChange={this.handleChange}
                                    checked={active}
                                />
                            </div>
                            <div className="col s3">
                                <CheckBox
                                    id='inmarket'
                                    label='In Market'
                                    onChange={this.handleChange}
                                    checked={inmarket}
                                />
                            </div>
                            <div className="col s3">
                                <CheckBox
                                    id='closed'
                                    label='Closed'
                                    onChange={this.handleChange}
                                    checked={closed}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <h5 className="center-align teal-text">{(this.state.projectResults && this.state.projectResults.length > 0) ? this.state.projectResults.length + ' results' : ''}</h5>
                <Results
                    projects={this.state.projectResults}
                />

            </div>
        );
    }
}

export default ProjectPage;