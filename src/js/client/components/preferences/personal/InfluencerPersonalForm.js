import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Personal from './../../search/components/personal';
import PersonalAdvanced from './../../search/components/personaladvanced';
import Verticals from '../../search/components/verticals';
import Mediums from '../../search/components/mediums';
import Children from '../../search/components/children';

const InfluencerPersonalForm = (props) => {
    return (
        <div>
            <h6 className="teal-text">Personal</h6>
            <Personal
                personal={props.influencer.personal}
                onChange={props.onChange}
                parent="personal"
            />
            <h6 className="teal-text">General</h6>
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
            <Children
                children={props.influencer.children}
                onChange={props.onChange}
                parent="children"
            />
            <hr />
            <div className="col 12" style={{float: 'none'}}>
                <Link to="" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat" onClick={props.cancel}>Cancel</Link>
                <Link to="" className="teal waves-effect waves-light btn-large right" onClick={props.onSubmit}>Save Changes</Link>
            </div>
        </div>
    );
};

export default InfluencerPersonalForm;