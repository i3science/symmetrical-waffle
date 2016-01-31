import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Personal from './personal';
import Audience from './audience';
import Verticals from '../../search/verticals';
import Form from '../../common/Form';

const InfluencerManageForm = (props) => {
    if (!props.influencer) {
        return <div/>;
    }
    return (
        <div>
            <div className="row">
                <div className="col s8 separate-right">
                    <Form.Text
                        name="name_first"
                        label="First Name"
                        value={props.influencer.name.first}
                        active={true}
                        onChange={props.onChange}
                    />
                    <Form.Text
                        name="name_last"
                        label="Last Name"
                        value={props.influencer.name.last}
                        active={true}
                        onChange={props.onChange}
                    />
                    <Form.Text
                        name="email"
                        label="Email Address"
                        type="email"
                        value={props.influencer.email}
                        active={true}
                        onChange={props.onChange}
                    />
                    <div className="col s12 right-align">
                        <Form.CheckBox
                            name="advanced"
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
                <Link to="" className="teal waves-effect waves-light btn-large" onClick={props.onSubmit}>Save Changes</Link>
                <Link to="" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat right" onClick={props.cancel}>Cancel</Link>
            </div>
        </div>
    );
};

export default InfluencerManageForm;