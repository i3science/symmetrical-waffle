import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Actions from '../../../actions/UiActions';
import listStore from '../../../stores/ListStore';

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
            currentProject: {}
        };
        this._onChange = this._onChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._addList = this._addList.bind(this);
    }
    componentWillMount() {
        Actions.refreshLists();
        listStore.addChangeListener(this._onChange);
    }
    componentDidMount() {
        if (this.props.location.state) {
            this.state.currentProject = this.props.location.state.project || {};
            this.setState({currentProject: this.state.currentProject});
        }
    }
    componentWillUnmount() {
        listStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.setState({
            lists: listStore.getLists()
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
            this.state.listResults = [];
        }
        this.setState({listResults: this.state.listResults});
    }

    _addList(lid, pid, event) {
        event.preventDefault();
        this.state.currentProject.lists.push(lid);
        this.setState({currentProject: this.state.currentProject});
        Actions.updateProject(this.state.currentProject);
        Materialize.toast('Added', 4000); // eslint-disable-line no-undef
    }

    render() {
        var keyword = this.state.filter.keyword;
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <div className="row center-align">
                        <h4 className="grey-text text-darken-2">Find a List</h4>
                        {this.state.currentProject.name ? this.state.currentProject.name : 'noproj'}


                        <div className="col s10" style={{margin: '0 auto', float: 'none'}}>
                            <div className="row" style={{marginTop: '50px'}}>
                                <div className="col s6" style={{margin: '0 auto', float: 'none'}}>
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
                    </div>
                    <br />
                    <div className="row center-align">
                        <Link to="/search" className="teal waves-effect waves-light btn-large center"><i className="material-icons right">list</i>Create a list</Link>
                    </div>
                </div>
                <h5 className="center-align teal-text">{(this.state.listResults && this.state.listResults.length > 0) ? this.state.listResults.length + ' results' : ''}</h5>
                <ListResults
                    lists={this.state.listResults}
                    project={this.state.currentProject._id || null}
                    addList={this._addList}
                />

            </div>
        );
    }
}

export default ListPage;