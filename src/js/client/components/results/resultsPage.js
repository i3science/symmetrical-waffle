import React from 'react';
import Sidebar from '../sidebar';
import SidebarFilter from './sidebarfilter';
import influencerStore from '../../stores/InfluencerStore';
import searchStore from '../../stores/SearchStore';
import Actions from '../../actions/UiActions';
import InfluencerCardList from '../influencers/list/CardList';
import SelectedInfluencers from './selectedInfluencers';
import _ from 'lodash';

class Serp extends React.Component {
    constructor() {
        super();
        this.state = {
            results: searchStore.getResults(),
            filters: searchStore.getFilters(),
            influencers: influencerStore.getInfluencers(),
            selectedInfluencers: influencerStore.getSelectedInfluencers(),
            exposures: 150000000,
            colors: searchStore.getColors()
        };
        this._onChange = this._onChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
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
            //influencers: influencerStore.getInfluencers(),
            filters: searchStore.getFilters(),
            results: searchStore.getResults(),
            selectedInfluencers: influencerStore.getSelectedInfluencers()
        });
    }

    _onSelectionChanged(influencer, selected) { // eslint-disable-line no-unused-vars
        Actions.addInfluencerToList(influencer);
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

    addToList(pass, event) {
        event.preventDefault();
        Actions.addInfluencerToList(pass);
    }

    render() {
        if (this.state.results) {
            return (
                <div>
                    <Sidebar>
                        <SidebarFilter
                            filters={this.state.filters}
                            onChange={this._handleChange}
                            minimal={true}
                        />
                    </Sidebar>
                    <SelectedInfluencers
                        selectedInfluencers={this.state.selectedInfluencers}
                        addInfluencer={this.addInfluencerToList}
                        colors={this.state.colors}
                        exposures={this.state.exposures}
                        resultNum={this.state.results.length} />
                    <InfluencerCardList
                        influencers={this.state.results}
                        addToList={this.addToList}
                        selectedInfluencers={this.state.selectedInfluencers}
                        onSelectionChanged={this._onSelectionChanged} />
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Sorry, there were no results</h3>
                </div>
            );
        }

    }
}

export default Serp;