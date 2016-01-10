import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';

export default (props) => {
    return (
        <div className="row">
            <div className="col s3">
                <h3>Preferences</h3>
                <ul>
                    <Link to="/prefs/accounts/me">My Account</Link>
                    <Link to="/prefs/influencers">Influencers</Link>
                    <Link to="/prefs/clients">Clients</Link>
                </ul>
            </div>
            <div className="col s9">
                {props.children}
            </div>
        </div>
    );
};