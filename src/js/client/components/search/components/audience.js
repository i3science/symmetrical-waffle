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
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <div className="row" style={{marginBottom: '0'}}>
                        <div className="col s6">
                            <InputText
                                id="ageFrom_range_from"
                                label="Age from"
                                val={props.audience.ageFrom_range_from}
                                parent={props.parent}
                                active
                                onChange={props.onChange}
                            />
                        </div>
                        <div className="col s6">
                            <InputText
                                id="ageTo_range_to"
                                label="to"
                                val={props.audience.ageTo_range_to}
                                parent={props.parent}
                                active
                                onChange={props.onChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputSelect
                        id="married"
                        label="Marital Status"
                        val={props.audience.married}
                        parent={props.parent}
                        options={['Yes', 'No', 'Common Law']}
                        onChange={props.onChange}
                    />
                </div>
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputSelect
                        id="language"
                        label="Primary Language"
                        val={props.audience.language}
                        parent={props.parent}
                        options={['English', 'French', 'Spanish', 'Other']}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="city"
                        label="City"
                        val={props.audience.city}
                        parent={props.parent}
                        active
                        onChange={props.onChange}
                    />
                </div>
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="state"
                        label="State/Province"
                        val={props.audience.state}
                        parent={props.parent}
                        active
                        onChange={props.onChange}
                    />
                </div>
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="country"
                        label="Country"
                        val={props.audience.country}
                        parent={props.parent}
                        active
                        onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Audience;