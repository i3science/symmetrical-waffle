import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../elements/inputtext';
import InputSelect from '../../elements/inputselect';

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

export default Personal;