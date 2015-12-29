import React from 'react';
import { Link } from 'react-router';
import AppStore from '../../stores/UiStore';
import Actions from '../../actions/UiActions';
import Filters from './filters';

class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencers: AppStore.getAllInfluencers(),
            filters: AppStore.getAllFilters()
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
            filters: AppStore.getAllFilters(),
            influencers: AppStore.getAllInfluencers()
        });
    }
    addFilter(id, obj) {
        if (obj.target.type) {
            if (obj.target.checked) {
                Actions.addFilter(id);
            } else {
                Actions.removeFilter(id);
            }
        }
    }
    render() {
        return (
            <div>
                <Link to="/search/results" className="btn">Results</Link>
                <Filters
                    filters={this.state.filters}
                    influencers={this.state.influencers}
                    onChange={this.addFilter}
                />
            </div>
        );
    }
}
export default SearchPage;