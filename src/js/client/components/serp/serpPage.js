import React from 'react';
import AppStore from '../../stores/store';
import Actions from '../../actions/actions';
import Results from './result';
import SelectedInfluencers from './selectedInfluencers';



class Serp extends React.Component {
    constructor() {
        super();
        this.state = {
            influencers: AppStore.getAllInfluencers(),
            selectedInfluencers: AppStore.getSelectedInfluencers()
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
        this.setState({ selectedInfluencers: AppStore.getSelectedInfluencers()});
    }

    addToList(pass, event) {
        event.preventDefault();
        Actions.addInfluencerToList(pass);
    }

    render() {
        return (
            <div>
                <Results
                    influencers={this.state.influencers}
                    addToList={this.addToList}
                    selectedInfluencers={this.state.selectedInfluencers}
                />
                <SelectedInfluencers
                    selectedInfluencers={this.state.selectedInfluencers}
                    addInfluencer={this.addInfluencerToList}
                />
            </div>
        );
    }
}

export default Serp;