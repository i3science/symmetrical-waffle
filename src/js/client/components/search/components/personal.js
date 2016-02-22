import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import InputSelect from '../../common/input/inputselect';

const Personal = (props) => {
    if (!props.personal) {
        return <div></div>;
    }
    return (
        <div className="row">
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputSelect
                    id="sex"
                    label="Gender"
                    val={props.personal.sex}
                    parent={props.parent}
                    options={['Male', 'Female', 'Vampire', 'Other']}
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                {props.search ?
                <div className="row" style={{marginBottom: '0'}}>
                    <div className="col s6">
                        <InputText
                            id="age_range_from"
                            label="Age from"
                            val={props.personal.age_range_from}
                            parent={props.parent}
                            active
                            onChange={props.onChange}
                        />
                    </div>
                    <div className="col s6">
                        <InputText
                            id="age_range_to"
                            label="to"
                            val={props.personal.age_range_to}
                            parent={props.parent}
                            active
                            onChange={props.onChange}
                        />
                    </div>
                </div> :
                <InputText
                    id="age"
                    label="Age"
                    val={props.personal.age}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />}
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputSelect
                    id="married"
                    label="Marital Status"
                    val={props.personal.married}
                    parent={props.parent}
                    options={['Yes', 'No', 'Common Law']}
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputSelect
                    id="language"
                    label="Primary Language"
                    val={props.personal.language}
                    parent={props.parent}
                    options={['English', 'French', 'Spanish', 'Other']}
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputText
                    id="city"
                    label="City"
                    val={props.personal.city}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputText
                    id="state"
                    label="State/Province"
                    val={props.personal.state}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                <InputText
                    id="country"
                    label="Country"
                    val={props.personal.country}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default Personal;