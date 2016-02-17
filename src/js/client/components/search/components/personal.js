import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import InputSelect from '../../common/input/inputselect';
import Switch from '../../common/input/switch';
import Verticals from './verticals';
import Mediums from './medium';
import Children from './children';
import Channels from './channels';

const Personal = (props) => {
    if (!props.personal) {
        return <div></div>;
    }
    return (
        <div className="">
            <h5 className="teal-text">Personal</h5>
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
                    </div>
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
            <h6 className="teal-text">Mediums</h6>
            <Mediums
                onChange={props.onChange}
                mediums={props.mediums}
                parent="mediums"
                minimal={props.minimal || false}
            />
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
            <div id="advanced-collapse" style={{maxHeight: (props.minimal ? 'auto' : '0'), transition: 'max-height .5s', overflow: 'hidden'}}>
                {!props.minimal ? <hr /> : null}
                {!props.minimal ? <h5>Advanced Criteria</h5> : null}
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
                <h6 className="teal-text">Children</h6>
                <Children
                    onChange={props.onChange}
                    children={props.children}
                    parent="children"
                    minimal={props.minimal || false}
                />
                <h6 className="teal-text">Minimum Followers</h6>
                <Channels
                    onChange={props.onChange}
                    channels={props.channels}
                    parent="channels"
                    minimal={props.minimal || false}
                />
            </div>
        </div>
    );
};

export default Personal;