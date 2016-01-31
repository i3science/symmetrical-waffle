import React from 'react';
import { Link } from 'react-router';
import Actions from '../../../actions/UiActions';
import InfluencerStore from '../../../stores/InfluencerStore';
import InputText from '../../elements/inputtext';
import InputSelect from '../../elements/inputselect';
import InputRange from '../../elements/inputrange';

import Verticals from '../../search/verticals';

const Personal = (props) => {
    if (!props.personal) {
        return <div></div>;
    }
    return (
        <div>
            <div className="row">
                <div className="col s3">
                    <InputSelect
                        id="personal_sex"
                        label="Gender"
                        val={props.personal.sex}
                        options={['Male', 'Female', 'Vampire', 'Other']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputText
                        id="personal_age"
                        label="Age"
                        val={props.personal.age}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputSelect
                        id="personal_married"
                        label="Marital Status"
                        val={props.personal.married}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputSelect
                        id="personal_language"
                        label="Primary Language"
                        val={props.personal.language}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    <InputSelect
                        id="personal_employment"
                        label="Employment Status"
                        val={props.personal.employment}
                        options={['Employed', 'Unemployed']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputText
                        id="personal_householdIncome"
                        label="Household Income"
                        val={props.personal.householdIncome}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputText
                        id="personal_ethnicity"
                        label="Ethnicity"
                        val={props.personal.ethnicity}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputSelect
                        id="personal_residence"
                        label="Type of Residence"
                        val={props.personal.residence}
                        options={['House', 'Condo', 'Apartment', 'Other']}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s4">
                    <InputText
                        id="personal_city"
                        label="City"
                        val={props.personal.city}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <InputText
                        id="personal_state"
                        label="State/Province"
                        val={props.personal.state}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <InputText
                        id="personal_country"
                        label="Country"
                        val={props.personal.country}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    );
};

const Audience = (props) => {
    if (!props.audience) {
        return <div></div>;
    }
    return (
        <div>
            <div className="row">
                <div className="col s3">
                    <InputRange
                        id="audience_sex"
                        label="Gender"
                        val={props.audience.sex}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputText
                        id="audience_age"
                        label="Age"
                        val={props.audience.age}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputSelect
                        id="audience_married"
                        label="Marital Status"
                        val={props.audience.married}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputSelect
                        id="audience_language"
                        label="Primary Language"
                        val={props.audience.language}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    <InputSelect
                        id="audience_employment"
                        label="Employment Status"
                        val={props.audience.employment}
                        options={['Employed', 'Unemployed']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputText
                        id="audience_householdIncome"
                        label="Household Income"
                        val={props.audience.householdIncome}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputText
                        id="audience_ethnicity"
                        label="Ethnicity"
                        val={props.audience.ethnicity}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputSelect
                        id="audience_residence"
                        label="Type of Residence"
                        val={props.audience.residence}
                        options={['House', 'Condo', 'Apartment', 'Other']}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s4">
                    <InputText
                        id="audience_city"
                        label="City"
                        val={props.audience.city}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <InputText
                        id="audience_state"
                        label="State/Province"
                        val={props.audience.state}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <InputText
                        id="audience_country"
                        label="Country"
                        val={props.audience.country}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    );
};

class InfluencerCreatePage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencer: {
                name: {},
                personal: {},
                audience: {},
                verticals: []
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
        console.log()
    }

    handleChange(event) {
        console.log(event);
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
            if (category === 'verticals') {
                var isIn = this.state.influencer[category].indexOf(event.target.name);
                if ((isIn === -1) && value) {
                    this.state.influencer[category].push(event.target.name);
                } else {
                    this.state.influencer[category].splice(isIn, 1);
                }
            } else {
                this.state.influencer[category][item] = value;
            }
        } else {
            this.state.influencer[item] = value;
        }
        this.setState({influencer: this.state.influencer});
    }
    _cancel() {
        this.setState({influencer: {}});
        this.props.history.goBack();
    }

    _onSubmit(event) {
        event.preventDefault();
        if (!this.state.influencer._id) {
            Actions.createInfluencer(this.state.influencer);
            alert('Created!');
        } else {
            Actions.updateInfluencer(this.state.influencer);
            alert('Updated!');
        }

    }

    render() {
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <h4 className="center-align" style={{marginBottom: '30px'}}>Create an Influencer</h4>
                    <div className="row">
                        <div className="col s8 separate-right">
                            <InputText
                                id="name_first"
                                label="First Name"
                                val={this.state.influencer.name.first}
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
                        </div>
                        <div className="col s4">
                            <div className="center-align">
                                <h6 className="teal-text" style={{marginBottom: '20px'}}>Send to influencer for them to complete</h6>
                                <br />
                                <Link to="" className="teal waves-effect waves-light btn-large center">
                                    <i className="material-icons right">send</i>Send
                                </Link>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <div className="col 12" style={{float: 'none'}}>
                        <Link to="" className="teal waves-effect waves-light btn-large" onClick={this._onSubmit}>Save Changes</Link>
                        <Link to="" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat right" onClick={this._cancel}>Cancel</Link>
                    </div>
                </div>
                <div className="card-panel">
                    <h4 className="center-align">Advanced</h4>
                    <h5 className="teal-text">Personal</h5>
                    <div className="row">
                        <Personal
                            personal={this.state.influencer.personal}
                            onChange={this.handleChange}
                        />
                    </div>
                    <h5 className="teal-text">Verticals</h5>
                    <div className="row">
                        <Verticals
                            verticals={this.state.influencer.verticals}
                            onChange={this.handleChange}
                        />
                    </div>
                    <h5 className="teal-text">Audience</h5>
                    <div className="row">
                        <Audience
                            audience={this.state.influencer.audience}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
            </div>
        );
    }

}
export default InfluencerCreatePage;