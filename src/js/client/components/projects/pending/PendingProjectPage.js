import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Actions from '../../../actions/UiActions';
import influencerStore from '../../../stores/InfluencerStore';
import searchStore from '../../../stores/SearchStore';
import listStore from '../../../stores/ListStore';
import ProjectParams from './../common/ProjectParams';
import InfluencerCardList from '../../influencers/list/CardList';
import SelectedInfluencers from '../../results/selectedInfluencers';
import Card from '../../common/Card';

class ProjectPage extends React.Component {
    constructor() {
        super();
        this.state = {
            controlledDate: null,
            checkpoints: {},
            influencers: null,
            exposures: 150000000,
            colors: searchStore.getColors()
        };
        this._onChange = this._onChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleDate = this._handleDate.bind(this);
        this._addCheckpoint = this._addCheckpoint.bind(this);
        this._addList = this._addList.bind(this);

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
        if (!this.props.project) {
            return;
        }
        if (this.props.project.lists) {
            let listResults = listStore.getInfluencersFromList(this.props.project.lists);
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
            if (this.props.project.influencers.length > 0) {
                this.props.project.influencers.map(item => {
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
        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        if (!event.target.dataset.parent) {
            this.state.project[event.target.id] = value;
        } else {
            this.state.project[event.target.dataset.parent][event.target.id] = value;
        }
        this.setState({project: this.state.project});
    }
    _handleDate(name, date, parent){
        this.state.project[parent].push({name: name, date: date});
        this.setState({project: this.state.project});
        Actions.updateProject(this.state.project);
    }

    _addCheckpoint(checkpoint, parent, event) {
        event.preventDefault();
        $('#' + parent + '_container').hide();
        $('#add-check, #add-check i').show();
        this.props.project[parent].push(checkpoint);
        this.setState({
            checkpoints: {}
        });
    }


    _addList(event) {
        event.preventDefault();
        this.props.history.pushState({project: this.props.project}, '/lists');
    }

    render() {
        return (
            <div>
                <Card title={this.props.project.name} deep>
                    <ProjectParams
                        project={this.props.project}
                        onChange={this._handleChange}
                        handleDate={this._handleDate}
                        addList={this._addList}
                    />
                </Card>
                {this.state.influencers ? <div>
                <SelectedInfluencers
                    selectedInfluencers={this.state.influencers}
                    //addInfluencer={this.addInfluencerToList}
                    colors={this.state.colors}
                    exposures={this.props.project.required_impressions}
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

export default ProjectPage;