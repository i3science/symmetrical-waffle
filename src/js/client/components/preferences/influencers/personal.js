import React from 'react'; // eslint-disable-line no-unused-vars
import Form from '../../common/Form';

const Personal = (props) => {
    if (!props.personal) {
        return <div></div>;
    }
    return (
        <div>
            <div className="row">
            </div>
            <div className="row">
                <div className="col s3">
                    <Form.Select
                        name="personal_sex"
                        label="Gender"
                        value={props.personal.sex}
                        options={['Male', 'Female', 'Vampire', 'Other']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Text
                        name="personal_age"
                        label="Age"
                        value={props.personal.age}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Select
                        name="personal_married"
                        label="Marital Status"
                        value={props.personal.married}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Select
                        name="personal_language"
                        label="Primary Language"
                        value={props.personal.language}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    <Form.Select
                        name="personal_employment"
                        label="Employment Status"
                        value={props.personal.employment}
                        options={['Employed', 'Unemployed']}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Text
                        name="personal_householdIncome"
                        label="Household Income"
                        value={props.personal.householdIncome}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Text
                        name="personal_ethnicity"
                        label="Ethnicity"
                        value={props.personal.ethnicity}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <Form.Select
                        name="personal_residence"
                        label="Type of Residence"
                        value={props.personal.residence}
                        options={['House', 'Condo', 'Apartment', 'Other']}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s4">
                    <Form.Text
                        name="personal_city"
                        label="City"
                        value={props.personal.city}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <Form.Text
                        name="personal_state"
                        label="State/Province"
                        value={props.personal.state}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <Form.Text
                        name="personal_country"
                        label="Country"
                        value={props.personal.country}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Personal;