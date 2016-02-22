import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import InputSelect from '../../common/input/inputselect';

const AudienceAdvanced = (props) => {
    if (!props.audience) {
        return <div></div>;
    }
    return (
        <div className="row">
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputSelect
                    id="employment"
                    label="Employment Status"
                    val={props.audience.employment}
                    parent={props.parent}
                    options={['Employed', 'Unemployed']}
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputText
                    id="householdIncome"
                    label="Household Income"
                    val={props.audience.householdIncome}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default AudienceAdvanced;