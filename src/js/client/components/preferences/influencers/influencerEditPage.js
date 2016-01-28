import React from 'react';
import { Link } from 'react-router';
import Actions from '../../../actions/UiActions';
import InfluencerStore from '../../../stores/InfluencerStore';
import InputText from '../../elements/inputtext';
import InputSelect from '../../elements/inputselect';

var options = [
    'Male',
    'Female',
    'Vampire',
    'Other'
];




class InfluencerEditPage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencer: {
                name: {},
                audience: {}
            }

        };
        this._onChange = this._onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._cancel = this._cancel.bind(this);
    }

    componentWillMount() {
        InfluencerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        InfluencerStore.removeChangeListener(this._onChange);
    }



    _onChange() {
        let currentInfluencer = InfluencerStore.getCurrentInfluencer();
        if (currentInfluencer) {
            this.setState({influencer: currentInfluencer});
        }

    }

    handleChange(event) {
        if (event.target.id.indexOf('_') > -1) {
            let drill = event.target.id.split('_');
            this.state.influencer[drill[0]][drill[1]] = event.target.value;
        } else {
            this.state.influencer[event.target.id] = event.target.value;
        }

        this.setState({influencer: this.state.influencer});
    }
    _cancel() {
        this.setState({influencer: {}});
        this.props.history.goBack();
    }

    _onSubmit(event) {
        event.preventDefault();
        Actions.createInfluencer(this.state.influencer);
    }

    render() {
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <h4 className="center-align">Create an Influencer</h4>
                    <div className="row">
                        <div className="col s8" style={{float: 'none', margin: '0 auto'}}>
                            <InputSelect
                                id="audience_sex"
                                label="Sex"
                                val={this.state.influencer.audience.sex}
                                options={options}
                                onChange={this.handleChange}
                            />
                            <InputText
                                id="name_first"
                                label="First Name"
                                val={this.state.influencer.name.first}
                                placeholder="something"
                                active={true}
                                onChange={this.handleChange}
                            />
                            <InputText
                                id="name_last"
                                label="Last Name"
                                val={this.state.influencer.name.last}
                                active={true}
                                onChange={this.handleChange}
                            />
                            <InputText
                                id="email"
                                label="Email Address"
                                type="email"
                                val={this.state.influencer.email}
                                active={true}
                                onChange={this.handleChange}
                            />
                            <InputText
                                id="timezone"
                                label="Time Zone"
                                val={this.state.influencer.timezone}
                                active={true}
                                onChange={this.handleChange}
                            />
                            <InputText
                                id="username"
                                label="Username"
                                val={this.state.influencer.username}
                                active={true}
                                onChange={this.handleChange}
                            />
                            <InputText
                                id="password"
                                label="Password"
                                type="password"
                                val={this.state.influencer.password}
                                active={true}
                                onChange={this.handleChange}
                            />
                            <InputText
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                val={this.state.influencer.confirmPassword}
                                active={true}
                                onChange={this.handleChange}
                            />
                            <div className="col 12" style={{float: 'none'}}>
                                <Link to="" className="blue-grey lighten-3 waves-effect waves-light btn-large" onClick={this._cancel}>Cancel</Link>
                                <Link to="" className="teal waves-effect waves-light btn-large right" onClick={this._onSubmit}>Save Changes</Link>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row center-align">
                        <h6 className="teal-text" style={{marginBottom: '20px'}}>Send to influencer for them to complete</h6>
                        <br />
                        <Link to="" className="teal waves-effect waves-light btn-large center">
                            <i className="material-icons right">send</i>Send
                        </Link>
                    </div>
                </div>



            </div>
        );
    }

}
export default InfluencerEditPage;