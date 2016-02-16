import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import InputSelect from '../../common/input/inputselect';
import Switch from '../../common/input/switch';
import Verticals from './verticals';
import Children from './children';

const Audience = (props) => {
    if (!props.audience) {
        return <div></div>;
    }
    console.log(props);
    return (
        <div className="">
            <h5 className="teal-text">Audience</h5>
            <div className="row">
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <div className="row" style={{marginBottom: '0'}}>
                        <div className="col s6">
                            <InputText
                                id="ageFrom_range_from"
                                label="Age from"
                                val={props.audience.ageFrom_range_from}
                                parent={props.parent}
                                active={true}
                                onChange={props.onChange}
                            />
                        </div>
                        <div className="col s6">
                            <InputText
                                id="ageTo_range_to"
                                label="to"
                                val={props.audience.ageTo_range_to}
                                parent={props.parent}
                                active={true}
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
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="state"
                        label="State/Province"
                        val={props.audience.state}
                        parent={props.parent}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className={'col ' + (props.minimal ? 's12' : 's3')}>
                    <InputText
                        id="country"
                        label="Country"
                        val={props.audience.country}
                        parent={props.parent}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <h6 className="teal-text">Verticals</h6>
            <Verticals
                onChange={props.onChange}
                verticals={props.verticals}
                parent="verticals"
                minimal={props.minimal || false}
            />
            {!props.minimal ?
                <div className="left">
                    <Switch
                        id="advanced"
                        label="Advanced"
                        onChange={props.expand}
                    />
                </div> : null}
            <div className="clearfix"></div>
            <div id="advanced-collapse" style={{maxHeight: '0', transition: 'max-height .5s', overflow: 'hidden'}}>
                <hr />
                <h5>Advanced Criteria</h5>
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
                            active={true}
                            onChange={props.onChange}
                        />
                    </div>
                </div>
                <h6 className="teal-text">Children</h6>
                <Children
                    onChange={props.onChange}
                    children={props.children}
                    parent="children"
                    minimal={props.minimal || false}
                />
            </div>
        </div>
    );
};

export default Audience;