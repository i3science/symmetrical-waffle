import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Audience from './../../search/components/audience';
import AudienceAdvanced from './../../search/components/audienceadvanced';
import Channels from '../../search/components/channels';

const InfluencerAudienceForm = (props) => {
    return (
        <div>
            <h6 className="teal-text">Audience Information</h6>
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
            <h6 className="teal-text">Media Channels</h6>
            <Channels
                channels={props.influencer.channels}
                onChange={props.onChange}
                parent="channels"
            />
            <hr />
            <div className="col 12" style={{float: 'none'}}>
                <Link to="" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat" onClick={props.cancel}>Cancel</Link>
                <Link to="" className="teal waves-effect waves-light btn-large right" onClick={props.onSubmit}>Save Changes</Link>
            </div>
        </div>
    );
};

export default InfluencerAudienceForm;