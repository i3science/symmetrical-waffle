import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import _ from 'lodash';
import InputText from '../../elements/inputtext';
import InfluencerCardList from '../../influencers/list/CardList';
import influencerStore from '../../../stores/InfluencerStore';

import Actions from '../../../actions/UiActions';

class InfluencerPrefsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: {
                searchtag: ''
            },
            influencers: influencerStore.getInfluencers()
        };
        this.handleChange = this.handleChange.bind(this);
        this._onChange = this._onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        influencerStore.addChangeListener(this._onChange);
        Actions.refreshInfluencerList();
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
        //this.props.history.pushState(null, '/search/results');
    }

    render() {
        var value = this.state.filter.searchtag;
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <div className="row center-align">
                        <h4>Find an Influencer by First and/or Last Name</h4>
                        <div className="col s6" style={{margin: '0 auto', float: 'none'}}>
                            <div className="col s12" style={{marginTop: '50px'}}>
                                <InputText
                                    id="search"
                                    label="Find an influencer"
                                    color="teal"
                                    placeholder="Start typing a first or last name"
                                    val={value}
                                    active={true}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row center-align">
                        <Link
                            to="/preferences/influencers/create"
                            className="teal waves-effect waves-light btn-large center
                            "><i className="material-icons right">person_add</i>Add an influencer
                        </Link>
                    </div>
                </div>
                <h5 className="center-align teal-text">{(this.state.results && this.state.results.length > 0) ? this.state.results.length + ' results' : ''}</h5>
                <InfluencerCardList
                    influencers={(this.state.results && this.state.results.length > 0) ? this.state.results : this.state.influencers}
                    edit="/preferences/influencers/edit"
                />
            </div>
        );
    }
}

export default InfluencerPrefsPage;