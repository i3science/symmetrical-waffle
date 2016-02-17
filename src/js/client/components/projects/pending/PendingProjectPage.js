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

import DatePicker from 'material-ui/lib/date-picker/date-picker';
//import Calendar from




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
        this._addCheckpoint = this._addCheckpoint.bind(this);
        this._newDate = this._newDate.bind(this);
        this._addList = this._addList.bind(this);

        this.shandleChange = this.shandleChange.bind(this);
    }
    componentDidMount() {
        influencerStore.addChangeListener(this._onChange);
        listStore.addChangeListener(this._onChange);
        Actions.refreshInfluencerList();
        Actions.refreshLists();
        this.setState({ controlledDate: '11/11/1111' });
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
        let name = event.target.id;
        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        if (event.target.type === 'radio') {
            value = event.target.id;
            name = event.target.name;
        }
        if (!event.target.dataset.parent) {
            this.props.project[name] = value;
        } else {
            this.props.project[event.target.dataset.parent][name] = value;
        }
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
    _newDate(event) {
        this.state.checkpoints[event.target.id] = event.target.value;
        this.setState({checkpoints: this.state.checkpoints});
    }

    shandleChange(event, date) {
        this.setState({
            controlledDate: date
        });
    }

    _addList(event) {
        event.preventDefault();
        this.props.history.pushState({project: this.props.project}, '/lists');
    }

    render() {
        if (!this.state.influencers) {
            return (<p>Loading influencers...</p>);
        }
        return (
            <div>
                <div className="card-panel">
                    <DatePicker
                        defaultValue="11/11/1111"
                        value={this.state.controlledDate}
                        onChange={this.shandleChange}
                        floatingLabelText="Floating Label Text"
                    />
                </div>
                <ProjectParams
                    project={this.props.project}
                    onChange={this._handleChange}
                    addList={this._addList}
                    addCheckpoint={this._addCheckpoint}
                    newDate={this._newDate}
                    newCheckpoints={this.state.checkpoints}
                />
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
        );
    }
}

export default ProjectPage;