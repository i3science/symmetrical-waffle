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
            filters: {
                personal: {},
                medium: [],
                verticals: []
            },
            results: searchStore.getResults()
        };
        this._onChange = this._onChange.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.compare = this.compare.bind(this);
    }

    componentWillMount() {
        Actions.refreshInfluencerList();
        //this.setState({filters: searchStore.getFilters()});
        influencerStore.addChangeListener(this._onChange);
        searchStore.addChangeListener(this._onChange);
        //this.setState({influencers: influencerStore.getInfluencers()});

    }

    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
        searchStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            //filters: searchStore.getFilters(),
            influencers: influencerStore.getInfluencers()
        });

    }
    addFilter(event) {
        //if (event.target.type === 'checkbox') {
        //    Actions.addFilter(event.target.id, event.target.checked);
        //} else {
        //    Actions.addFilter(event.target.id, event.target.value);
        //}
        //if (this.state.filters) {
        //    let filters = [];
        //    _.forEach(this.state.filters, function(item) {
        //        filters.push(item.id);
        //    });
        //    this.state.results = _.filter(this.state.influencers, 'verticals', filters);
        //    Actions.updateResults(this.state.results);
        //}
    }



    handleChange(event) {
        var value = event.target.value;
        if (event.target.id.indexOf('_') > -1) {
            let drill = event.target.id.split('_');
            var category = drill[0];
            var item = drill[1];
        } else {
            item = event.target.id;
        }
        if (event.target.type === 'checkbox') {
            value = (event.target.checked === true);
        }
        if (category) {
            if ((category === 'verticals') || (category === 'medium')) {
                var isIn = this.state.filters[category].indexOf(event.target.name);
                if ((isIn === -1) && value) {
                    this.state.filters[category].push(event.target.name);
                } else {
                    this.state.filters[category].splice(isIn, 1);
                }
            } else {
                this.state.filters[category][item] = value;
            }
        } else {
            this.state.filters[item] = value;
        }
        this.setState({filters: this.state.filters});
        console.log(this.state.filters);

        this.compare(this.state.filters, this.state.influencers);
    }

    compare(one, two) {
        //console.log(two[0]);
        //console.log(_.intersection(two[0], one));

    }




    render() {

        /* redoing filters, please leave here */

        //var filter = {};
        //filter['amplifier'] = true;
        //filter['verticals'] = ['beauty', 'fashion'];
        //
        //var filtered = this.state.influencers.filter(function(influencer) {
        //    return (
        //        influencer.amplifier === filter.amplifier &&
        //        _.intersection(influencer.verticals, filter.verticals).length === filter.verticals.length
        //    );
        //});
        //console.log(filtered);

        /* end */


        return (
            <div>
                <Filters
                    filters={this.state.filters}
                    influencers={this.state.influencers}
                    onChange={this.handleChange} />
                <Link to="/search/results" className="btn">Results</Link>
            </div>
        );
    }
}
export default SearchPage;