import React from 'react';
import AppStore from '../../stores/store';
import Actions from '../../actions/actions';
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
        this.setState({ filters: AppStore.getAllFilters()});
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