import React from 'react';
import { Link } from 'react-router';
import AppStore from '../../stores/UiStore';
import Actions from '../../actions/UiActions';
import Results from './result';
import SelectedInfluencers from './selectedInfluencers';

class Serp extends React.Component {
    constructor() {
        super();
        this.state = {
            results: AppStore.getResults(),
            selectedInfluencers: AppStore.getSelectedInfluencers(),
            exposures: 150000000,
            colors: AppStore.getColors()
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        AppStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            results: AppStore.getResults(),
            selectedInfluencers: AppStore.getSelectedInfluencers()
        });
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
                    resultNum={this.state.results.length}
                />
                <Results
                    influencers={this.state.results}
                    addToList={this.addToList}
                    selectedInfluencers={this.state.selectedInfluencers}
                />
            </div>
        );
    }
}

export default Serp;