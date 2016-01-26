import React from 'react';
import { Link } from 'react-router';
import InputText from '../elements/inputtext';
import influencerStore from '../../stores/InfluencerStore';
//import searchStore from '../../stores/SearchStore';
import Actions from '../../actions/UiActions';
//import Filters from './filters';
import _ from 'lodash';
import { __ } from '../../utils/i18n';

class SearchStart extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: {
                searchtag: ''
            },
            influencers: influencerStore.getInfluencers(),
            results: []
        };
        this.handleChange = this.handleChange.bind(this);
        this._onChange = this._onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            influencers: influencerStore.getInfluencers()
        });
    }
    handleChange(event) {
        this.setState({
            filter: {
                searchtag: event.target.value
            }
        });
        if ((event.target.value.length > 0) && (event.target.value != (' ' || null || undefined))) {
            this.state.results = _.filter(this.state.influencers, function (item) {
                let result = (item.name.first + ' ' + item.name.last).toLowerCase();
                return result.indexOf(event.target.value.toLowerCase()) > -1;
            });
        } else {
            this.state.results = [];
        }
        this.setState({results: this.state.results});
    }

    onClick(event) {
        event.preventDefault();
        Actions.updateResults(this.state.results);
        this.props.history.pushState(null, '/search/results');
    }

    render() {
        var value = this.state.filter.searchtag;
        return (
            <div>
                <div className="card-panel">
                    <div className="row center-align">
                        <div className="col s6" style={{float: 'none', margin: '50px auto'}}>
                            <Link to="search" className="waves-effect waves-light btn-large left"><i className="material-icons right">playlist_add</i>Start a Project</Link>
                            <Link to="search/influencer" className="waves-effect waves-light btn-large right"><i className="material-icons right">search</i>Free Form Search</Link>
                            <div className="clearfix"></div>
                            <div className="col s12" style={{marginTop: '50px'}}>
                                <InputText
                                    id="something"
                                    label={__('search.label')}
                                    color="teal"
                                    placeholder={__('search.placeholder')}
                                    col="s12"
                                    val={value}
                                    active={true}
                                    onChange={this.handleChange} />
                                <h6 id="result-count">{__('search.results_count', {count: this.state.results.length})}</h6>
                                <Link to="" className="amber accent-3 waves-effect waves-light btn-large center" style={{marginTop: '20px'}} onClick={this.onClick}>{__('search.button')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchStart;