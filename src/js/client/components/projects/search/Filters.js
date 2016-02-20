import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import InputText from '../../common/input/inputtext';
import CheckBox from '../../common/input/checkbox';

export default React.createClass({

    propTypes: {
        filterClient: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            filterClient: true
        };
    },

    getInitialState: function() {
        return {
            projectResults: [],
            projects: [],
            filter: {
                client: '',
                keyword: '',
                state: [
                    'active',
                    'inmarket'
                ]
            }
        };
    },

    _handleChange: function(event) {
        if (event.target.type === 'checkbox') {
            if (event.target.checked) {
                this.state.filter.state.push(event.target.id);
            } else {
                _.pull(this.state.filter.state, event.target.id);
            }
        } else {
            this.state.filter[event.target.id] = event.target.value;
        }
        this.setState({filter: this.state.filter});
        this.props.onChange(this.state.filter);
    },

    render() {
        var keyword = this.state.filter.keyword,
            client = this.state.filter.client,
            active = _.includes(this.state.filter.state, 'active'),
            pending = _.includes(this.state.filter.state, 'pending'),
            inmarket = _.includes(this.state.filter.state, 'inmarket'),
            closed = _.includes(this.state.filter.state, 'closed');
        return (
            <div className="card-panel z-depth-4">
                <div className="row center-align">
                    <h4 className="grey-text text-darken-2">Find a Project</h4>
                    <div className="col s10" style={{margin: '50px auto', float: 'none'}}>
                        <Link to="/projects/create" className="waves-effect waves-light btn-large"><i className="material-icons right">playlist_add</i>Start a Project</Link>
                        <div className="clearfix"></div>
                        <div className="row" style={{marginTop: '50px'}}>
                            {this.props.filterClient && (
                                <div className="col s6">
                                    <InputText
                                        id="client"
                                        label="Client"
                                        color="teal"
                                        placeholder="Start typing a client name"
                                        val={client}
                                        active
                                        onChange={this._handleChange}
                                    />
                                </div>
                            )}
                            <div className={'col '+(this.props.filterClient ? 's6' : 's12')}>
                                <InputText
                                    id="keyword"
                                    label="Keyword"
                                    color="teal"
                                    placeholder="Start typing a keyword"
                                    val={keyword}
                                    active
                                    onChange={this._handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col s8" style={{margin: '0 auto ', float: 'none'}}>
                        <div className="col s3">
                            <CheckBox
                                id='pending'
                                label='Pending'
                                onChange={this._handleChange}
                                checked={pending}
                            />
                        </div>
                        <div className="col s3">
                            <CheckBox
                                id='active'
                                label='Active'
                                onChange={this._handleChange}
                                checked={active}
                            />
                        </div>
                        <div className="col s3">
                            <CheckBox
                                id='inmarket'
                                label='In Market'
                                onChange={this._handleChange}
                                checked={inmarket}
                            />
                        </div>
                        <div className="col s3">
                            <CheckBox
                                id='closed'
                                label='Closed'
                                onChange={this._handleChange}
                                checked={closed}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});