import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Personal from './../../search/components/personal';
import PersonalAdvanced from './../../search/components/personaladvanced';
import Audience from './../../search/components/audience';
import AudienceAdvanced from './../../search/components/audienceadvanced';
import Verticals from '../../search/components/verticals';
import Mediums from '../../search/components/mediums';
import Children from '../../search/components/children';
import Channels from '../../search/components/channels';
import InputText from '../../common/input/inputtext';
import CheckBox from '../../common/input/checkbox';
import Switch from '../../common/input/switch';

const InfluencerManageForm = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col s8 separate-right">
                    <InputText
                        id="name_first"
                        label="First Name"
                        val={props.influencer.name.first}
                        active
                        onChange={props.onChange}
                    />
                    <InputText
                        id="name_last"
                        label="Last Name"
                        val={props.influencer.name.last}
                        active
                        onChange={props.onChange}
                    />
                    <InputText
                        id="email"
                        label="Email Address"
                        type="email"
                        val={props.influencer.email}
                        active
                        onChange={props.onChange}
                    />
                    <div className="col s12 right-align">
                        <Switch
                            id="advanced"
                            label="Advanced"
                            onChange={props.expand}
                        />
                    </div>
                </div>
                <div className="col s4">
                    <div className="center-align">
                        <h6 className="teal-text" style={{marginBottom: '20px'}}>Send to influencer for them to complete</h6>
                        <br />
                        <Link to="" className="teal waves-effect waves-light btn-large center">
                            <i className="material-icons right">send</i>Send
                        </Link>
                    </div>
                </div>
            </div>
            <div id="advanced-collapse" style={{maxHeight: '0', transition: 'max-height .5s', overflow: 'hidden'}}>
                <h5 className="teal-text">Personal</h5>
                <Personal
                    personal={props.influencer.personal}
                    onChange={props.onChange}
                    parent="personal"
                />
                <PersonalAdvanced
                    personal={props.influencer.personal}
                    onChange={props.onChange}
                    parent="personal"
                />
                <h6 className="teal-text">Mediums</h6>
                <Mediums
                    mediums={props.influencer.mediums}
                    onChange={props.onChange}
                    parent="mediums"
                />
                <h6 className="teal-text">Verticals</h6>
                <Verticals
                    verticals={props.influencer.verticals}
                    onChange={props.onChange}
                    parent="verticals"
                />
                <h6 className="teal-text">Children</h6>
                <Children
                    children={props.influencer.children}
                    onChange={props.onChange}
                    parent="children"
                />
                <h6 className="teal-text">Media Channels</h6>
                <Channels
                    channels={props.influencer.channels}
                    onChange={props.onChange}
                    parent="channels"
                />
                <h5 className="teal-text">Audience</h5>
                <Audience
                    audience={props.influencer.audience}
                    onChange={props.onChange}
                    parent="audience"
                />
                <AudienceAdvanced
                    audience={props.influencer.audience}
                    onChange={props.onChange}
                    parent="audience"
                />
            </div>
            <hr />
            <div className="col 12" style={{float: 'none'}}>
                <Link to="" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat" onClick={props.cancel}>Cancel</Link>
                <Link to="" className="teal waves-effect waves-light btn-large right" onClick={props.onSubmit}>Save Changes</Link>
            </div>
        </div>
    );
};

export default InfluencerManageForm;