import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import InputSelect from '../../common/input/inputselect';

const Audience = (props) => {
    if (!props.audience) {
        return <div></div>;
    }
    return (
        <div>
            <div className="row">
                <div className="col s3">
                    <InputText
                        type="number"
                        id="audience_male"
                        label="Male"
                        class="center-align"
                        col="s6"
                        val={props.audience.male}
                        active
                        onChange={props.onChange}
                    />
                    <InputText
                        type="number"
                        id="audience_female"
                        label="Female"
                        class="center-align"
                        col="s6"
                        val={props.audience.female}
                        active
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputText
                        type="number"
                        id="audience_ageFrom"
                        label="Age"
                        class="center-align"
                        col="s6"
                        val={props.audience.ageFrom}
                        active
                        onChange={props.onChange}
                    />
                    <InputText
                        type="number"
                        id="audience_ageTo"
                        label="to"
                        class="center-align"
                        col="s6"
                        val={props.audience.ageTo}
                        active
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
                        type="number"
                        id="audience_householdIncome"
                        label="Household Income"
                        prefix="$"
                        val={props.audience.householdIncome}
                        active
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s3">
                    <InputText
                        id="audience_ethnicity"
                        label="Ethnicity"
                        val={props.audience.ethnicity}
                        active
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
                        active
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <InputText
                        id="audience_state"
                        label="State/Province"
                        val={props.audience.state}
                        active
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <InputText
                        id="audience_country"
                        label="Country"
                        val={props.audience.country}
                        active
                        onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Audience;