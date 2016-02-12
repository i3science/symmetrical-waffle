import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../elements/inputtext';
import InputSelect from '../../elements/inputselect';

const Personal = (props) => {
    if (!props.personal) {
        return <div></div>;
    }
    return (
        <div className="row">
            <div className="">
                {props.minimal && !props.personal.sex ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputSelect
                        id="sex"
                        label="Gender"
                        val={props.personal.sex}
                        parent={props.parent}
                        options={['Male', 'Female', 'Vampire', 'Other']}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && (!props.personal.age_range_from || !props.personal.age_range_to) ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="age_range_from"
                        label="Age from"
                        col="s6"
                        val={props.personal.age_range_from}
                        parent={props.parent}
                        active={true}
                        onChange={props.onChange}
                    />
                    <InputText
                        id="age_range_to"
                        label="to"
                        col="s6"
                        val={props.personal.age_range_to}
                        parent={props.parent}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && !props.personal.married ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputSelect
                        id="married"
                        label="Marital Status"
                        val={props.personal.married}
                        parent={props.parent}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && !props.personal.language ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputSelect
                        id="language"
                        label="Primary Language"
                        val={props.personal.language}
                        parent={props.parent}
                        options={['English', 'French', 'Spanish', 'Other']}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && !props.personal.employment ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputSelect
                        id="employment"
                        label="Employment Status"
                        val={props.personal.employment}
                        parent={props.parent}
                        options={['Employed', 'Unemployed']}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && !props.personal.householdIncome ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="householdIncome"
                        label="Household Income"
                        val={props.personal.householdIncome}
                        parent={props.parent}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && !props.personal.ethnicity ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="ethnicity"
                        label="Ethnicity"
                        val={props.personal.ethnicity}
                        parent={props.parent}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && !props.personal.residence ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputSelect
                        id="residence"
                        label="Type of Residence"
                        val={props.personal.residence}
                        parent={props.parent}
                        options={['House', 'Condo', 'Apartment', 'Other']}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && !props.personal.city ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="city"
                        label="City"
                        val={props.personal.city}
                        parent={props.parent}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && !props.personal.state ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="state"
                        label="State/Province"
                        val={props.personal.state}
                        parent={props.parent}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>}
                {props.minimal && !props.personal.country ? null :
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="country"
                        label="Country"
                        val={props.personal.country}
                        parent={props.parent}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>}
            </div>
        </div>
    );
};

export default Personal;