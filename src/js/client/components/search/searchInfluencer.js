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
        this._reset = this._reset.bind(this);
        this._cancel = this._cancel.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this.compare = this.compare.bind(this);
    }

    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
        searchStore.addChangeListener(this._onChange);
        let influencers = influencerStore.getInfluencers();
        if (influencers.length === 0) {
            Actions.refreshInfluencerList();
        }
    }

    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
        searchStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            influencers: influencerStore.getInfluencers(),
            filters: searchStore.getFilters(),
            results: searchStore.getResults()
        });
    }

    _handleChange(event) {
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
            if ((category === 'verticals') || (category === 'mediums')) {
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
        Actions.updateFilters(this.state.filters);
        Actions.updateResults(this.compare(this.state.filters, this.state.influencers));
    }

    _reset(event) {
        event.preventDefault();
        this.setState({filters : {
            personal: {},
            mediums: [],
            verticals: []
        }});
        Actions.updateFilters(this.state.filters);
    }

    _cancel(event) {
        event.preventDefault();
        //this.setState({influencer: {}});
        this.props.history.goBack();
    }

    compare(fil, influencers) {
        var filtered = influencers.filter(function(inf) {
            for (var prop in fil) {
                if (fil.hasOwnProperty(prop) && inf.hasOwnProperty(prop)) {
                    if (Array.isArray(fil[prop])) {
                        let isit = _.intersection(fil[prop], inf[prop]);
                        if (!(isit.length === fil[prop].length) && (fil[prop].length > 0)) {
                            return false;
                        }
                    } else if ((typeof fil[prop] === 'object') && !Array.isArray(fil[prop])) {
                        for (var deep in fil[prop]) {
                            if (fil[prop].hasOwnProperty(deep) && inf[prop].hasOwnProperty(deep)) {
                                if (Array.isArray(fil[prop][deep])) {
                                    let isit = _.intersection(fil[prop][deep], inf[prop][deep]);
                                    if (!(isit.length === fil[prop].length) && (fil[prop].length > 0)) {
                                        return false;
                                    }
                                } else if ((typeof fil[prop][deep] === 'object') && !Array.isArray(fil[prop][deep])) {
                                    //console.log('not_array but is_object');
                                } else {
                                    let condition = _.isEqual(
                                        (isNaN(inf[prop][deep]) ? inf[prop][deep].toLowerCase() : inf[prop][deep].toString()),
                                        (isNaN(fil[prop][deep]) ? fil[prop][deep].toLowerCase() : fil[prop][deep].toString())
                                    );
                                    if (!condition && (fil[prop][deep] !== '')) {
                                        return false;
                                    }
                                }
                            }
                        }
                    } else {
                        let condition = _.includes(
                            (isNaN(inf[prop]) ? inf[prop].toLowerCase() : inf[prop].toString()),
                            (isNaN(fil[prop]) ? fil[prop].toLowerCase() : fil[prop].toString())
                        );
                        if (!condition && (fil[prop] !== '')) {
                            return false;
                        }
                    }
                }
            }
            return true;
        });
        return filtered;
    }




    render() {
        return (
            <div className="card-panel z-depth-4">
                <Filters
                    filters={this.state.filters}
                    onChange={this._handleChange}
                />
                <Link to="" className="blue-grey lighten-3 waves-effect waves-light btn btn-flat white-text right"  onClick={this._reset}>Reset</Link>
                <div className="clearfix"></div>
                <hr />
                <div className="col 12" style={{float: 'none'}}>
                    <Link to="" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat" onClick={this._cancel}>Cancel</Link>
                    <Link to="/search/results" className="teal waves-effect waves-light btn-large right">Search</Link>
                </div>
            </div>
        );
    }
}
export default SearchPage;