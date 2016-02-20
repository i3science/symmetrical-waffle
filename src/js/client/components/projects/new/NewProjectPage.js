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

class NewProjectPage extends React.Component {
    constructor() {
        super();
        this.state = {
            project: projectStore.resetProject(),
            influencers: null,
            colors: searchStore.getColors()
        };
        this._onChange = this._onChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleDate = this._handleDate.bind(this);
        this._addList = this._addList.bind(this);
        this._onSave = this._onSave.bind(this);

    }
    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
        listStore.addChangeListener(this._onChange);
        Actions.refreshInfluencerList();
        Actions.refreshLists();
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
        console.log(this.state);
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
        console.log(event.target.id, event.target.value);
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

    _handleDate(name, date, parent){
        this.state.project[parent].push({name: name, date: date});
        this.setState({project: this.state.project});
    }

    _addList(event) {
        event.preventDefault();
        this.props.history.pushState({project: this.props.project}, '/lists');
    }

    _onSave() {
        if (this.state.project._id) {
            Actions.createProject(this.state.project);
        } else {
            Actions.updateProject(this.state.project);
        }

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
                        onSave={this._onSave}
                    />
                </Card>
                {this.state.influencers ? <div>
                    <SelectedInfluencers
                        selectedInfluencers={this.state.influencers}
                        //addInfluencer={this.addInfluencerToList}
                        colors={this.state.colors}
                        exposures={this.state.project.required_impressions}
                        resultNum={this.state.influencers.length} />
                    <Link to="" className="btn right" onClick={this._addList}>Add Lists</Link>
                    <div className="clearfix"></div>
                    <InfluencerCardList
                        influencers={this.state.influencers}
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

export default NewProjectPage;