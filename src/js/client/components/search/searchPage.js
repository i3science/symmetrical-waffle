import React from 'react';
import { Link } from 'react-router';
import AppStore from '../../stores/UiStore';
import Actions from '../../actions/UiActions';
import Filters from './filters';
import _ from 'lodash';

class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencers: AppStore.getAllInfluencers(),
            filters: AppStore.getAllFilters(),
            results: AppStore.getResults()
        };
        this._onChange = this._onChange.bind(this);
        this.addFilter = this.addFilter.bind(this);
    }

    componentWillMount() {
        AppStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            filters: AppStore.getAllFilters(),
            influencers: AppStore.getAllInfluencers(),
            results: AppStore.getResults()
        });
    }
    addFilter(id, obj) {
        if (obj.target.type === 'checkbox') {
            Actions.addFilter(id, obj.target.checked);
        } else {
            Actions.addFilter(obj.target.id, obj.target.value);
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
        return (
            <div>

                <Filters
                    filters={this.state.filters}
                    influencers={this.state.influencers}
                    onChange={this.addFilter}
                />
                <Link to="/search/results" className="btn">Results</Link>
            </div>
        );
    }
}
export default SearchPage;