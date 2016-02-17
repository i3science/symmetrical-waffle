import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Personal from './../../search/components/personal';
import Audience from './audience';
import Verticals from '../../search/components/verticals';
import InputText from '../../common/input/inputtext';
import CheckBox from '../../common/input/checkbox';

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
                        <CheckBox
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
                <div className="row">
                    <Personal
                        personal={props.influencer.personal}
                        onChange={props.onChange}
                    />
                </div>
                <h5 className="teal-text">Verticals</h5>
                <div className="row">
                    <Verticals
                        verticals={props.influencer.verticals}
                        onChange={props.onChange}
                    />
                </div>
                <h5 className="teal-text">Audience</h5>
                <div className="row">
                    <Audience
                        audience={props.influencer.audience}
                        onChange={props.onChange}
                    />
                </div>
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