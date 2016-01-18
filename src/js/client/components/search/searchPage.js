import React from 'react';
import { Link } from 'react-router';
import influencerStore from '../../stores/InfluencerStore';
import searchStore from '../../stores/SearchStore';
import Actions from '../../actions/UiActions';
import Filters from './filters';
import _ from 'lodash';

class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencers: influencerStore.getInfluencers(),
            filters: searchStore.getFilters(),
            results: searchStore.getResults()
        };
        this._onChange = this._onChange.bind(this);
        this.addFilter = this.addFilter.bind(this);
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
            filters: searchStore.getFilters(),
            influencers: influencerStore.getInfluencers()
        });
    }
    addFilter(event) {
        if (event.target.type === 'checkbox') {
            Actions.addFilter(event.target.id, event.target.checked);
        } else {
            Actions.addFilter(event.target.id, event.target.value);
        }
        if (this.state.filters) {
            let filters = [];
            _.forEach(this.state.filters, function(item) {
                filters.push(item.id);
            });
            this.state.results = _.filter(this.state.influencers, 'verticals', filters);
            Actions.updateResults(this.state.results);
        }
    }
    render() {

        /* redoing filters, please leave here */

        var filter = {};
        filter['amplifier'] = true;
        filter['verticals'] = ['beauty', 'fashion'];

        var filtered = this.state.influencers.filter(function(influencer) {
            return (
                influencer.amplifier === filter.amplifier &&
                _.intersection(influencer.verticals, filter.verticals).length === filter.verticals.length
            );
        });
        console.log(filtered);

        /* end */


        return (
            <div>
                <Filters
                    filters={this.state.filters}
                    influencers={this.state.influencers}
                    onChange={this.addFilter} />
                <Link to="/search/results" className="btn">Results</Link>
            </div>
        );
    }
}
export default SearchPage;