import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import _ from 'lodash';
import InputText from '../../common/input/inputtext';
import ClientList from './ClientList';
import representativeStore from '../../../stores/RepresentativeStore';

import Actions from '../../../actions/UiActions';

export default class ClientPrefsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: {
                searchtag: ''
            },
            representatives: representativeStore.getRepresentatives()
        };
        this.handleChange = this.handleChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
        representativeStore.addChangeListener(this._onChange);
        Actions.refreshRepresentatives();
    }

    componentWillUnmount() {
        representativeStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            representatives: representativeStore.getRepresentatives(),
            results: representativeStore.getRepresentatives()
        });
    }
    handleChange(event) {
        this.setState({
            filter: {
                searchtag: event.target.value
            }
        });
        if ((event.target.value.length > 0) && (event.target.value != (' ' || null || undefined))) {
            this.state.results = _.filter(this.state.representatives, function (item) {
                let result = (item.name.first + ' ' + item.name.last).toLowerCase();
                return result.indexOf(event.target.value.toLowerCase()) > -1;
            });
        } else {
            this.state.results = [];
        }
        this.setState({results: this.state.results});
    }

    render() {
        var value = this.state.filter.searchtag;
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <div className="row center-align">
                        <h4>Find a Client</h4>
                        <div className="col s6" style={{margin: '0 auto', float: 'none'}}>
                            <div className="col s12" style={{marginTop: '50px'}}>
                                <InputText
                                    id="search"
                                    label="Find a client"
                                    color="teal"
                                    placeholder="Start typing organization or contact name"
                                    val={value}
                                    active
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row center-align">
                        <Link
                                to="/preferences/clients/create"
                                className="teal waves-effect waves-light btn-large center">
                            <i className="material-icons right">person_add</i>Add a client
                        </Link>
                    </div>
                </div>
                <h5 className="center-align teal-text">{(this.state.results && this.state.results.length > 0) ? this.state.results.length + ' results' : ''}</h5>
                <ClientList
                    representatives={(this.state.results && this.state.results.length > 0) ? this.state.results : this.state.representatives}
                    link="/preferences/clients/:id/edit" />
            </div>
        );
    }
}