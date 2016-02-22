import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Actions from '../../../actions/UiActions';
import influencerStore from '../../../stores/InfluencerStore';
import searchStore from '../../../stores/SearchStore';
import listStore from '../../../stores/ListStore';
import projectStore from '../../../stores/ProjectStore';
import ProjectParams from './../common/ProjectParams';
import Card from '../../common/Card';

class NewProjectPage extends React.Component {
    constructor() {
        super();
        this.state = {
            project: projectStore.resetProject(),
            influencers: null,
            colors: searchStore.getColors()
        };
        this._removeCheckmark = this._removeCheckmark.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleDate = this._handleDate.bind(this);
        this._onChange = this._onChange.bind(this);
        this._addList = this._addList.bind(this);
        this._onSave = this._onSave.bind(this);
        this._cancel = this._cancel.bind(this);
    }
    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
        listStore.addChangeListener(this._onChange);
        Actions.refreshInfluencerList();
        Actions.refreshLists();
        if (this.state.project._id) {
            this.props.history.pushState(null, '/projects/' + this.state.project._id);
        }
    }
    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
        listStore.removeChangeListener(this._onChange);
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
                    if (influencer && !_.find(this.state.influencers, influencer)) {
                        this.state.influencers.push(influencer);
                    }
                });
                this.setState({influencers: this.state.influencers});
            }
        }
        if (!this.state.influencers) {
            return;
        }
        if (this.state.influencers.length === 0) {
            if (this.state.project.influencers.length > 0) {
                this.state.project.influencers.map(item => {
                    let influencer = influencerStore.getInfluencerById(item.influencer);
                    if (influencer && !_.find(this.state.influencers, influencer)) {
                        this.state.influencers.push(influencer);
                    }
                });
                this.setState({influencers: this.state.influencers});
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
    _onSave(event) {
        event.preventDefault();
        if (!this.state.project._id) {
            Actions
                .createProject(this.state.project)
                .then(() => {
                    this.props.history.pushState(null, '/projects/' + projectStore.getCurrentProjectId());
                });
        }
    }
    _cancel(event) {
        event.preventDefault();
        this.setState({project: projectStore.resetProject()});
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <Card title={this.state.project.name || 'New Project'} deep>
                    <ProjectParams
                        project={this.state.project}
                        onChange={this._handleChange}
                        handleDate={this._handleDate}
                        addList={this._addList}
                    />
                    <hr />
                    <div className="col 12" style={{float: 'none'}}>
                        <Link to="" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat" onClick={this._cancel}>Cancel</Link>
                        <Link to="" className="teal waves-effect waves-light btn-large right" onClick={this._onSave}>Save Changes</Link>
                    </div>
                </Card>
            </div>
        );
    }
}

export default NewProjectPage;