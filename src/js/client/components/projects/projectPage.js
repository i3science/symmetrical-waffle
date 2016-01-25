import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import InputText from '../elements/inputtext';
import CheckBox from '../elements/checkbox';

/*

project object:
advertiser
project name
amplifiers
live date

 */

const Result = (props) => {
    //console.log(props.project.advertiser);
    return (
        <div className="col m3 s2">
            <div className="card">
                <div className="card-content">
                    <span className="card-title teal-text text-darken-1">{props.project.advertiser}</span>
                    <p><strong>{props.project.name}</strong></p>
                    <p>Amplifiers: {props.project.amplifiers}</p>
                    <p>Live Date: {props.project.start}</p>
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


var project = {
    advertiser: 'Ford',
    name: 'Pepsi Thanksgiving',
    amplifiers: 300,
    start: 112015,
    state: 'active'
};
var project2 = {
    advertiser: 'Ford',
    name: 'Chrysler Picnic',
    amplifiers: 900,
    start: 112016,
    state: 'pending'
};

var projects = [
    project,
    project2,
    project,
    project2,
    project,
    project2,
    project,
    project2,
    project,
    project2,
    project,
    project2
];

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
                    'inexec',
                    'closed'
                ]
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        this.setState({projects: projects});
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

        if ((this.state.filter.client || this.state.filter.keyword).length > 0 &&
            (this.state.filter.client || this.state.filter.keyword) !== (' ' || '' || null || undefined)) {
            this.state.projectResults = _.filter(this.state.projects, function (item) {
                let client = item.advertiser.toLowerCase();
                let keyword = (item.name + ' ' + item.advertiser).toLowerCase();
                return (
                    (client.indexOf(this.state.filter.client.toLowerCase()) > -1) &&
                    (keyword.indexOf(this.state.filter.keyword.toLowerCase()) > -1) &&
                    _.contains(this.state.filter.state, item.state)
                );
            }, this);
        } else {
            this.state.projectResults = [];
        }
        this.setState({projectResults: this.state.projectResults});
    }
    render() {
        var keyword = this.state.filter.keyword,
            client = this.state.filter.client,
            active = _.contains(this.state.filter.state, 'active'),
            pending = _.contains(this.state.filter.state, 'pending'),
            inexec = _.contains(this.state.filter.state, 'inexec'),
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
                                    id='active'
                                    label='Active'
                                    onChange={this.handleChange}
                                    checked={active}
                                />
                            </div>
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
                                    id='inexec'
                                    label='In Execution'
                                    onChange={this.handleChange}
                                    checked={inexec}
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