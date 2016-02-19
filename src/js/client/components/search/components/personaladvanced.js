import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import InputSelect from '../../common/input/inputselect';

const PersonalAdvanced = (props) => {
    if (!props.personal) {
        return <div></div>;
    }
    return (
        <div className="row">
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputSelect
                    id="employment"
                    label="Employment Status"
                    val={props.personal.employment}
                    parent={props.parent}
                    options={['Employed', 'Unemployed']}
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputText
                    id="householdIncome"
                    label="Household Income"
                    val={props.personal.householdIncome}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputText
                    id="ethnicity"
                    label="Ethnicity"
                    val={props.personal.ethnicity}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputSelect
                    id="residence"
                    label="Type of Residence"
                    val={props.personal.residence}
                    parent={props.parent}
                    options={['House', 'Condo', 'Apartment', 'Other']}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default PersonalAdvanced;