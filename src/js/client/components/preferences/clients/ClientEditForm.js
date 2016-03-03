import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import InputText from '../../common/input/inputtext';
import ClientDropdown from '../../common/input/stateful/ClientDropdown';

const ClientEditForm = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col s8 separate-right">
                    <ClientDropdown
                        id="client"
                        label="Client Name"
                        val={props.representative.client}
                        onChange={props.onChange} />
                    <InputText
                        id="first"
                        label="First Name"
                        val={props.representative.name.first}
                        parent="name"
                        active
                        onChange={props.onChange}
                    />
                    <InputText
                        id="last"
                        label="Last Name"
                        val={props.representative.name.last}
                        parent="name"
                        active
                        onChange={props.onChange}
                    />
                    <InputText
                        id="email"
                        label="Email Address"
                        type="email"
                        val={props.representative.email}
                        active
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s4">
                    <div className="center-align">
                        <h6 className="teal-text" style={{marginBottom: '20px'}}>Send to client for them to complete</h6>
                        <br />
                        <a className="teal waves-effect waves-light btn-large center" onClick={props.onSend}>
                            <i className="material-icons right">send</i> Send
                        </a>
                    </div>
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

export default ClientEditForm;