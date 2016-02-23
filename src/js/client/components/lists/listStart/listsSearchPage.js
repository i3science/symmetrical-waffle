import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Actions from '../../../actions/UiActions';
import listStore from '../../../stores/ListStore';
import projectStore from '../../../stores/ProjectStore';

import ListResults from './listresults';
import InputText from '../../common/input/inputtext';


class ListPage extends React.Component {
    constructor() {
        super();
        this.state = {
            listResults: [],
            lists: [],
            filter: {
                keyword: ''
            },
            currentProject: null
        };
        this._onChange = this._onChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._addList = this._addList.bind(this);
    }
    componentWillMount() {
        Actions.refreshLists();
        listStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        listStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        if (projectStore.isAdding()) {
            this.setState({
                currentProject: projectStore.getCurrentProject()
            });
        }
        this.setState({
            lists: listStore.getLists(),
            listResults: listStore.getLists()
        });

    }
    _handleChange(event) {
        this.state.filter[event.target.id] = event.target.value;
        this.setState({filter: this.state.filter});

        if ((this.state.filter.keyword).length > 0 && (this.state.filter.keyword) !== (' ' || '' || null || undefined)) {
            this.state.listResults = _.filter(this.state.lists, function (item) {
                let keyword = _.lowerCase(item.name);
                return keyword.indexOf(_.lowerCase(this.state.filter.keyword)) > -1;
            }.bind(this));
        } else {
            this.state.listResults = this.state.lists;
        }
        this.setState({listResults: this.state.listResults});
    }

    _addList(lid, pid, event) {
        event.preventDefault();
        this.state.currentProject.lists.push(lid);
        let currentProject = this.state.currentProject;
        this.setState({currentProject: null});
        Actions.updateProject(currentProject, false);
        Materialize.toast('Added', 4000); // eslint-disable-line no-undef
        this.props.history.pushState(null, '/projects/' + currentProject._id);
    }

    render() {
        var keyword = this.state.filter.keyword;
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <div className="row center-align">
                        {this.state.currentProject ?
                            <div>
                                <h4 className="grey-text text-darken-2">Find a List {this.state.currentProject.name ? 'to add to ' : ''}</h4>
                                <h5 className="grey-text text-darken-2">{this.state.currentProject.name}</h5>
                            </div>
                            : <h4 className="grey-text text-darken-2">Find an Influencer</h4>}
                        <div className="col s6" style={{float: 'none', margin: '50px auto'}}>
                            <Link to="/search" className="waves-effect waves-light btn-large center"><i className="material-icons right">playlist_add</i>Create a list</Link>
                            <div className="clearfix"></div>
                            <div className="col s12" style={{marginTop: '50px'}}>
                                <InputText
                                        id="keyword"
                                        label="Keyword"
                                        color="teal"
                                        placeholder="Start typing a keyword"
                                        val={keyword}
                                        active
                                        onChange={this._handleChange}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
                <h5 className="center-align teal-text">{(this.state.listResults && this.state.listResults.length > 0) ? this.state.listResults.length + ' results' : ''}</h5>
                <ListResults
                    lists={this.state.listResults}
                    project={this.state.currentProject || null}
                    addList={this._addList}
                />

            </div>
        );
    }
}

export default ListPage;