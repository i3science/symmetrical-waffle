import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Actions from '../../../actions/UiActions';
import influencerStore from '../../../stores/InfluencerStore';
import searchStore from '../../../stores/SearchStore';
import listStore from '../../../stores/ListStore';
import projectStore from '../../../stores/ProjectStore';
import ProjectParams from './../common/ProjectParams';
import InfluencerCardList from '../../influencers/list/CardList';
import SelectedInfluencers from '../../results/selectedInfluencers';
import Card from '../../common/Card';

class PendingProjectPage extends React.Component {
    constructor() {
        super();
        this.state = {
            colors: searchStore.getColors(),
            projectInfluencers: [],
            project: projectStore.getCurrentProject(),
            exposures: 150000000,
            controlledDate: null,
            influencers: null,
            checkpoints: {}
        };
        this._removeCheckmark = this._removeCheckmark.bind(this);
        this._updateProjects = this._updateProjects.bind(this);
        this._addInfluencers = this._addInfluencers.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleDate = this._handleDate.bind(this);
        this._onChange = this._onChange.bind(this);
        this._addList = this._addList.bind(this);
        this._onSave = this._onSave.bind(this);
        this._cancel = this._cancel.bind(this);
    }
    componentWillMount() {
        projectStore.addChangeListener(this._updateProjects);
        influencerStore.addChangeListener(this._onChange);
        listStore.addChangeListener(this._onChange);
        Actions.refreshInfluencerList();
        Actions.refreshLists();
    }
    componentWillUnmount() {
        projectStore.removeChangeListener(this._updateProjects);
        influencerStore.removeChangeListener(this._onChange);
        listStore.removeChangeListener(this._onChange);
    }
    _updateProjects() {
        this.setState({project: projectStore.getCurrentProject()});
    }
    _onChange() {
        this.setState({
            influencers: influencerStore.getInfluencers()
        });
        if (!this.state.project) {
            return;
        }
        if (this.state.project.lists) {
            let listResults = listStore.getInfluencersFromList(this.state.project.lists);
            if (listResults) {
                listResults.map(item => {
                    let influencer = influencerStore.getInfluencerById(item);
                    if (influencer && !_.find(this.state.projectInfluencers, influencer)) {
                        this.state.projectInfluencers.push(influencer);
                    }
                });
                this.setState({projectInfluencers: this.state.projectInfluencers});
            }
        }
        if (!this.state.influencers) {
            return;
        }
        if (this.state.projectInfluencers.length === 0) {
            if (this.state.project.influencers.length > 0) {
                this.state.project.influencers.map(item => {
                    let influencer = influencerStore.getInfluencerById(item.influencer);
                    if (influencer && !_.find(this.state.projectInfluencers, influencer)) {
                        this.state.projectInfluencers.push(influencer);
                    }
                });
                this.setState({projectInfluencers: this.state.projectInfluencers});
            }
        }
    }
    _handleChange(event) {
        let value = event.target.value;
        let id = event.target.id;

        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        if (event.target.type === 'radio') {
            id = event.target.name;
            value = event.target.id;
        }
        if (!event.target.dataset.parent) {
            this.state.project[id] = value;
        } else {
            this.state.project[event.target.dataset.parent][id] = value;
        }
        this.setState({project: this.state.project});
    }
    _handleDate(date, name, parent) {
        if (parent) {
            this.state.project[parent].push({name: name, date: date});
        } else {
            this.state.project[name] = date;
        }
        this.setState({project: this.state.project});
        Actions.updateProject(this.state.project);
    }
    _removeCheckmark(index, phase) {
        this.state.project['checkpoints_' + phase].splice(index, 1);
        this.setState({project: this.state.project});
        Actions.updateProject(this.state.project);
    }
    _onSave(event) {
        event.preventDefault();
        Actions.updateProject(this.state.project);
    }
    _cancel(event) {
        event.preventDefault();
        this.props.history.goBack();
    }
    _addList() {
        Actions.setCurrentProject(this.state.project);
        this.props.history.pushState(null, '/lists');
    }
    _addInfluencers() {
        Actions.setCurrentProject(this.state.project);
        this.props.history.pushState(null, '/search');
    }

    render() {
        return (
            <div>
                <Card title={this.state.project.name} deep>
                    <ProjectParams
                        project={this.state.project}
                        onChange={this._handleChange}
                        handleDate={this._handleDate}
                        addList={this._addList}
                        removeCheckmark={this._removeCheckmark}
                    />
                    <hr />
                    <div className="col 12" style={{float: 'none'}}>
                        <Link to="" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat" onClick={this._cancel}>Cancel</Link>
                        <Link to="" className="teal waves-effect waves-light btn-large right" onClick={this._onSave}>Save Changes</Link>
                    </div>
                </Card>
                {this.state.projectInfluencers ? <div>
                    <button type="button" className="btn right" onClick={this._addList}>Add Lists</button>
                    <button type="button" className="btn right" onClick={this._addInfluencers}>Add Influencers</button>
                <div className="clearfix"></div>
                <SelectedInfluencers
                    selectedInfluencers={this.state.projectInfluencers}
                    colors={this.state.colors}
                    exposures={this.state.project.required_impressions}
                    resultNum={this.state.projectInfluencers.length}
                />
                <InfluencerCardList
                    influencers={this.state.projectInfluencers}
                    //addToList={this.addToList}
                    //selectedInfluencers={this.state.influencers}
                    //onSelectionChanged={this._onSelectionChanged}
                />
                    </div>
                    : null}

            </div>
        );
    }
}

export default PendingProjectPage;