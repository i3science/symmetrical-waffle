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
        //console.log('store change');
        this.setState({ filters: AppStore.getAllFilters()});
    }
    addFilter(id, obj) {
        if (obj.target.type) {
            var filt = {
                id: id,
                status: obj.target.checked
            };
            if (obj.target.checked) {
                Actions.addFilter(filt);
            } else {
                Actions.removeFilter(filt);
            }
        }
    }

    render() {
        console.log(this.state);
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