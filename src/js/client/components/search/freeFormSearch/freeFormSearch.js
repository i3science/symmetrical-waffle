import React from 'react';
import { Link } from 'react-router';
import influencerStore from '../../../stores/InfluencerStore';
import searchStore from '../../../stores/SearchStore';
import Actions from '../../../actions/UiActions';
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
        this._compare = this._compare.bind(this);
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
        let value = event.target.value;
        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            let isIn = this.state.filters[event.target.dataset.parent].indexOf(event.target.name);
            if ((isIn === -1) && value) {
                this.state.filters[event.target.dataset.parent].push(event.target.name);
            } else {
                this.state.filters[event.target.dataset.parent].splice(isIn, 1);
            }
        } else {
            if (!event.target.dataset.parent) {
                this.state.filters[event.target.id] = value;
            } else {
                this.state.filters[event.target.dataset.parent][event.target.id] = value;
            }
        }
        this.setState({filters: this.state.filters});
        Actions.updateFilters(this.state.filters);
        Actions.updateResults(this._compare(this.state.filters, this.state.influencers));
    }

    _reset(event) {
        event.preventDefault();

        this.state.filters.personal = {};
        this.state.filters.mediums = [];
        this.state.filters.verticals = [];
        this.setState({
            filters: {
                personal: this.state.filters.personal,
                mediums: this.state.filters.mediums,
                verticals: this.state.filters.verticals
            }
        });
        Actions.updateFilters(this.state.filters);
    }

    _cancel(event) {
        event.preventDefault();
        //this.setState({influencer: {}});
        this.props.history.goBack();
    }


    _compare(filter, influencers) {
        let compareRange = (prop, from, to) => {
            return (
                (from ? (prop >= Number(from)) : true) &&
                (to ? (prop <= Number(to)) : true)
            );
        };
        let findProperty = (target, prop) => {
            if (target.hasOwnProperty(prop)) {
                return target[prop];
            } else {
                for (var props in target) {
                    if (target.hasOwnProperty(props) && target[props].hasOwnProperty(prop)) {
                        if ((typeof target[props] === 'object') && !Array.isArray(target[props])) {
                            return findProperty(target[props], prop);
                        } else {
                            return false;
                        }
                    }
                }
            }
        };
        let loopThrough = (fil, inf) => {
            for (var prop in fil) {
                if(fil.hasOwnProperty(prop)) {
                    if (Array.isArray(fil[prop])) {
                        let isit = _.intersection(fil[prop], inf[prop]);
                        if (!(isit.length === fil[prop].length) && (fil[prop].length > 0)) {
                            return false;
                        }
                    } else if ((typeof fil[prop] === 'object') && !Array.isArray(fil[prop])) {
                        let innerFil = fil[prop],
                            innerInf = inf[prop];
                        if (!(loopThrough(innerFil, innerInf))) {
                            return false;
                        }
                    } else {
                        if (prop.indexOf('range') > -1) {
                            let propRoot = prop.split('_')[0];
                            if (!(compareRange(findProperty(inf, propRoot), fil[propRoot + '_range_from'], fil[propRoot + '_range_to']))) {
                                return false;
                            }
                        } else {
                            if (!(_.includes(_.lowerCase(findProperty(inf, prop)), _.lowerCase(fil[prop])))) {
                                return false;
                            }
                        }

                    }
                }
            }
            return true;
        };

        return influencers.filter(function(influencer) {
            return loopThrough(filter, influencer);
        });
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