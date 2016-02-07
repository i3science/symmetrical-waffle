import React from 'react';
import projectStore from '../../stores/ProjectStore';
import influencerStore from '../../stores/InfluencerStore';
import searchStore from '../../stores/SearchStore';
import Actions from '../../actions/UiActions';
import ProjectParams from './projectParams';
import InfluencerCardList from '../influencers/list/CardList';
import SelectedInfluencers from '../results/selectedInfluencers';

class ProjectPage extends React.Component {
    constructor() {
        super();
        this.state = {
            project: {},
            checkpoints: {},
            influencers: [],
            exposures: 150000000,
            colors: searchStore.getColors()
        };
        this._onChange = this._onChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._addCheckpoint = this._addCheckpoint.bind(this);
        this._newDate = this._newDate.bind(this);
    }
    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
        Actions.refreshInfluencerList();
        this.state.project = projectStore.getProjectById(this.props.params.id);
        this.setState({project: this.state.project});
    }
    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        if (this.state.influencers.length === 0) {
            if (this.state.project.influencers.length > 0) {
                this.state.project.influencers.map(item => {
                    if (influencerStore.getInfluencerById(item.influencer)) {
                        this.state.influencers.push(influencerStore.getInfluencerById(item.influencer));
                    }
                });
                this.setState({influencers: this.state.influencers});
            }
        }
    }
    _handleChange(event) {
        console.log(event.target);
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
        console.log(this.state.project);
    }

    _addCheckpoint(checkpoint, parent, event) {
        event.preventDefault();
        $('#' + parent + '_container').hide();
        $('#add-check, #add-check i').show();
        this.state.project[parent].push(checkpoint);
        this.setState({
            project: this.state.project,
            checkpoints: {}
        });
    }
    _newDate(event) {
        this.state.checkpoints[event.target.id] = event.target.value;
        this.setState({checkpoints: this.state.checkpoints});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <ProjectParams
                    project={this.state.project}
                    onChange={this._handleChange}
                    addCheckpoint={this._addCheckpoint}
                    newDate={this._newDate}
                    newCheckpoints={this.state.checkpoints}
                />
                <SelectedInfluencers
                    selectedInfluencers={this.state.influencers}
                    //addInfluencer={this.addInfluencerToList}
                    colors={this.state.colors}
                    exposures={this.state.project.required_impressions}
                    resultNum={this.state.influencers.length} />
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