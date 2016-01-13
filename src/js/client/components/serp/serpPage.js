import React from 'react';
import { Link } from 'react-router';
import influencerStore from '../../stores/InfluencerStore';
import searchStore from '../../stores/SearchStore';
import Actions from '../../actions/UiActions';
import InfluencerCardList from '../influencers/list/CardList';
import SelectedInfluencers from './selectedInfluencers';

class Serp extends React.Component {
    constructor() {
        super();
        this.state = {
            influencers: influencerStore.getInfluencers(),
            selectedInfluencers: influencerStore.getSelectedInfluencers(),
            exposures: 150000000,
            colors: searchStore.getColors()
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            influencers: influencerStore.getInfluencers(),
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
        return (
            <div>
                <Link to="/search" className="btn">Results</Link>
                <SelectedInfluencers
                    selectedInfluencers={this.state.selectedInfluencers}
                    addInfluencer={this.addInfluencerToList}
                    colors={this.state.colors}
                    exposures={this.state.exposures}
                    resultNum={this.state.influencers.length} />
                <InfluencerCardList
                    influencers={this.state.influencers}
                    addToList={this.addToList}
                    selectedInfluencers={this.state.selectedInfluencers}
                    onSelectionChanged={this._onSelectionChanged} />
            </div>
        );
    }
}

export default Serp;