import React from 'react';
import { Link } from 'react-router';
import { compare } from '../../../../shared/search.js';
import influencerStore from '../../../stores/InfluencerStore';
import searchStore from '../../../stores/SearchStore';
import projectStore from '../../../stores/ProjectStore';
import Actions from '../../../actions/UiActions';
import Radio from '../../common/input/radio';
import Filters from './filters';

class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencers: influencerStore.getInfluencers(),
            filters: searchStore.getFilters(),
            results: searchStore.getResults(),
            currentProject: projectStore.getCurrentProject()
        };
        this._handleChange = this._handleChange.bind(this);
        this._changeType = this._changeType.bind(this);
        this._onChange = this._onChange.bind(this);
        this._cancel = this._cancel.bind(this);
        this._expand = this._expand.bind(this);
        this._search = this._search.bind(this);
        this._reset = this._reset.bind(this);
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
        if (this.state.results.length === 0) {
            this.setState({results: this.state.influencers});
        }
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
        Actions.updateResults(compare(this.state.filters, this.state.influencers));
    }
    _search() {
        this.props.history.pushState(null, '/search/results');
    }
    _reset(event) {
        if (event) {
            event.preventDefault();
        }
        Actions.resetFilters();
    }
    _cancel(event) {
        event.preventDefault();
        this.props.history.goBack();
    }
    _expand(event) {
        var advanced = document.getElementById('advanced-collapse');
        if (event.target.checked) {
            advanced.style.maxHeight = '1000px';
        } else {
            advanced.style.maxHeight = '0';
        }
    }
    _changeType(event) {
        this._reset();
        this.state.filters.type = event.target.id;
        this.setState({filters: this.state.filters});
        Actions.updateFilters(this.state.filters);
    }
    render() {
        return (
            <div className="card-panel z-depth-4">
                <h4>Search Criteria</h4>
                <h6 className="teal-text">I am looking for an {this.state.type}...</h6>
                <div className="left" style={{marginRight: '30px'}}>
                    <Radio
                        id="influencer"
                        name="type"
                        label="Influencer"
                        onChange={this._changeType}
                        checked={this.state.filters.type === 'influencer'}
                    />
                </div>
                <div className="left">
                    <Radio
                        id="audience"
                        name="type"
                        label="Audience"
                        onChange={this._changeType}
                        checked={this.state.filters.type === 'audience'}
                    />
                </div>
                <div className="clearfix"></div>
                <hr />
                <Filters
                    filters={this.state.filters}
                    onChange={this._handleChange}
                    expand={this._expand}
                />
                <Link to="" className="blue-grey lighten-3 waves-effect waves-light btn btn-flat white-text right"  onClick={this._reset}>Reset</Link>
                <div className="clearfix"></div>
                <hr />
                <div className="col 12" style={{float: 'none'}}>
                    <button type="button" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat" onClick={this._cancel}>Cancel</button>
                    <button type="button" className="teal waves-effect waves-light btn-large right" onClick={this._search}>Search</button>
                </div>
            </div>
        );
    }
}
export default SearchPage;