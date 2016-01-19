import React from 'react';
import Sidebar from '../sidebar';
import SidebarFilter from './sidebarfilter';
import influencerStore from '../../stores/InfluencerStore';
import searchStore from '../../stores/SearchStore';
import Actions from '../../actions/UiActions';
import InfluencerCardList from '../influencers/list/CardList';
import SelectedInfluencers from './selectedInfluencers';

class Serp extends React.Component {
    constructor() {
        super();
        this.state = {
            results: searchStore.getResults(),
            //influencers: influencerStore.getInfluencers(),
            selectedInfluencers: influencerStore.getSelectedInfluencers(),
            exposures: 150000000,
            colors: searchStore.getColors()
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
        searchStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
        searchStore.addChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            //results: influencerStore.getResults();
            //influencers: influencerStore.getInfluencers(),
            selectedInfluencers: influencerStore.getSelectedInfluencers()
        });
    }

    _onSelectionChanged(influencer, selected) { // eslint-disable-line no-unused-vars
        Actions.addInfluencerToList(influencer);
    }

    addToList(pass, event) {
        event.preventDefault();
        Actions.addInfluencerToList(pass);
    }

    render() {
        if (this.state.results) {
            return (
                <div>
                    <Sidebar>
                        <SidebarFilter />
                    </Sidebar>
                    <SelectedInfluencers
                        selectedInfluencers={this.state.selectedInfluencers}
                        addInfluencer={this.addInfluencerToList}
                        colors={this.state.colors}
                        exposures={this.state.exposures}
                        resultNum={this.state.results.length} />
                    <InfluencerCardList
                        influencers={this.state.results}
                        addToList={this.addToList}
                        selectedInfluencers={this.state.selectedInfluencers}
                        onSelectionChanged={this._onSelectionChanged} />
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Sorry, there were no results</h3>
                </div>
            );
        }

    }
}

export default Serp;