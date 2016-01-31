import React from 'react'; // eslint-disable-line no-unused-vars
import Form from '../../common/Form';

const Audience = (props) => {
    if (!props.audience) {
        return <div></div>;
    }
    return (
        <div>
            <div className="row">
                <div className="col s3">
                    <Form.Text
                        type="number"
                        name="audience_male"
                        label="Male"
                        class="center-align"
                        col="s6"
                        value={props.audience.male}
                        active={true}
                        onChange={props.onChange}
                    />
                    <Form.Text
                        type="number"
                        name="audience_female"
                        label="Female"
                        class="center-align"
                        col="s6"
                        value={props.audience.female}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Text
                        type="number"
                        name="audience_ageFrom"
                        label="Age"
                        class="center-align"
                        col="s6"
                        value={props.audience.ageFrom}
                        active={true}
                        onChange={props.onChange}
                    />
                    <Form.Text
                        type="number"
                        name="audience_ageTo"
                        label="to"
                        class="center-align"
                        col="s6"
                        value={props.audience.ageTo}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Select
                        name="audience_married"
                        label="Marital Status"
                        value={props.audience.married}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Select
                        name="audience_language"
                        label="Primary Language"
                        value={props.audience.language}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    <Form.Select
                        name="audience_employment"
                        label="Employment Status"
                        value={props.audience.employment}
                        options={['Employed', 'Unemployed']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Text
                        type="number"
                        name="audience_householdIncome"
                        label="Household Income"
                        prefix="$"
                        value={props.audience.householdIncome}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Text
                        name="audience_ethnicity"
                        label="Ethnicity"
                        value={props.audience.ethnicity}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Select
                        name="audience_residence"
                        label="Type of Residence"
                        value={props.audience.residence}
                        options={['House', 'Condo', 'Apartment', 'Other']}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s4">
                    <Form.Text
                        name="audience_city"
                        label="City"
                        value={props.audience.city}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <Form.Text
                        name="audience_state"
                        label="State/Province"
                        value={props.audience.state}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <Form.Text
                        name="audience_country"
                        label="Country"
                        value={props.audience.country}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Audience;