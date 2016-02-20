import React from 'react'; // eslint-disable-line no-unused-vars
import Personal from '../components/personal';
import PersonalAdvanced from '../components/personaladvanced';
import Audience from '../components/audience';
import AudienceAdvanced from '../components/audienceadvanced';
import Mediums from '../components/mediums';
import Children from '../components/children';
import Verticals from '../components/verticals';
import Channels from '../components/channels';
import Switch from '../../common/input/switch';

const Filters = (props) => {
    return (
        <div>
            {props.filters.type === 'influencer' ?
            <div>
                <h5>Personal</h5>
                <Personal
                    personal={props.filters.personal}
                    onChange={props.onChange}
                    parent="personal"
                    search
                />
                <h6 className="teal-text">Mediums</h6>
                <Mediums
                    mediums={props.filters.mediums}
                    onChange={props.onChange}
                    parent="mediums"
                />
            </div> : null}
            {props.filters.type === 'audience' ?
            <div>
                <h5>Audience</h5>
                <Audience
                    audience={props.filters.audience}
                    onChange={props.onChange}
                    parent="audience"
                />
            </div> : null}
            <h6 className="teal-text">Verticals</h6>
            <Verticals
                verticals={props.filters.verticals}
                parent="verticals"
                onChange={props.onChange}
            />
            <Switch
                id="advanced"
                label="Advanced"
                onChange={props.expand}
            />

            <div id="advanced-collapse" style={{maxHeight: (props.minimal ? 'auto' : '0'), transition: 'max-height .5s', overflow: 'hidden'}}>
                <hr />
                <h5>Advanced</h5>
                {props.filters.type === 'influencer' ?
                <div>
                    <PersonalAdvanced
                        onChange={props.onChange}
                        personal={props.filters.personal}
                        vehicle={props.filters.vehicle}
                        parent="personal"
                    />
                    <h6 className="teal-text">Minimum Followers</h6>
                    <Channels
                        channels={props.filters.channels}
                        onChange={props.onChange}
                        parent="channels"
                        />
                </div> : null}
                {props.filters.type === 'audience' ?
                <AudienceAdvanced
                    audience={props.filters.audience}
                    onChange={props.onChange}
                    parent="audience"
                /> : null }
                <h6 className="teal-text">Children</h6>
                <Children
                    onChange={props.onChange}
                    children={props.filters.children}
                    parent="children"
                />
            </div>
        </div>
    );
};

export default Filters;