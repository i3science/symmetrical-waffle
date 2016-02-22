import React from 'react';
import { compare } from '../../../shared/search.js';
import Sidebar from '../sidebar';
import SidebarFilter from './sidebarfilter';
import influencerStore from '../../stores/InfluencerStore';
import searchStore from '../../stores/SearchStore';
import projectStore from '../../stores/ProjectStore';
import Actions from '../../actions/UiActions';
import InfluencerCardList from '../influencers/list/CardList';
import SelectedInfluencers from './selectedInfluencers';

class Serp extends React.Component {
    constructor() {
        super();
        this.state = {
            results: searchStore.getResults(),
            filters: searchStore.getFilters(),
            influencers: influencerStore.getInfluencers(),
            selectedInfluencers: influencerStore.getSelectedInfluencers(),
            exposures: 150000000,
            colors: searchStore.getColors(),
            currentProject: projectStore.getCurrentProject()
        };
        this._addInfluencers = this._addInfluencers.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
        searchStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
        searchStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            influencers: influencerStore.getInfluencers(),
            filters: searchStore.getFilters(),
            results: searchStore.getResults(),
            selectedInfluencers: influencerStore.getSelectedInfluencers()
        });
        if (this.state.results.length === 0) {
            this.setState({results: this.state.influencers});
        }
    }

    _onSelectionChanged(influencer, selected) {
        Actions.toggleInfluencerToList(influencer, selected);
    }

    _handleChange(event) {
        let value = event.target.value;
        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            let isIn = this.state.filters[event.target.dataset.parent].indexOf(event.target.name);
            if ((isIn === -1) && value) {
                this.state.filters[event.target.dataset.parent].push(event.target.name);
            } else {
                this.state.filters[event.target.dataset.parent].splice(isIn, 1);
            }
        } else {
            if (!event.target.dataset.parent) {
                this.state.filters[event.target.id] = value;
            } else {
                this.state.filters[event.target.dataset.parent][event.target.id] = value;
            }
        }
        this.setState({filters: this.state.filters});
        Actions.updateFilters(this.state.filters);
        Actions.updateResults(compare(this.state.filters, this.state.influencers));
    }
    _addInfluencers(iid, event) {
        event.preventDefault();
        for (let inf in iid) {
            if (iid.hasOwnProperty(inf)) {
                this.state.currentProject.influencers.push({influencer: iid[inf]._id});
            }
        }
        this.setState({currentProject: this.state.currentProject});
        Actions.updateProject(this.state.currentProject);
        Materialize.toast('Added', 4000); // eslint-disable-line no-undef
        this.props.history.pushState(null, '/projects/' + this.state.currentProject._id);
    }

    render() {
        let exposuresGroup = this.state.results.map(item => {
            let total = Number();
            for (let channel in item.channels) {
                if (item.channels.hasOwnProperty(channel)) {
                    total += Number(item.channels[channel]);
                }
            }
            return total;
        });
        let exposures = Number();
        for (let item in exposuresGroup) {
            exposures += exposuresGroup[item];
        }
        return (

            <div>
                <Sidebar>
                    <SidebarFilter
                        filters={this.state.filters}
                        onChange={this._handleChange}
                    />
                </Sidebar>
                <SelectedInfluencers
                    selectedInfluencers={this.state.selectedInfluencers}
                    colors={this.state.colors}
                    addInfluencers={this._addInfluencers}
                    exposures={exposures}
                    resultNum={this.state.results.length}
                    onSelectionChanged={this._onSelectionChanged}
                    project={this.state.currentProject}
                />
                <InfluencerCardList
                    influencers={this.state.results}
                    selectedInfluencers={this.state.selectedInfluencers}
                    onSelectionChanged={this._onSelectionChanged} />
            </div>
        );
    }
}

export default Serp;