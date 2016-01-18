import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';

class PreferencesPage extends React.Component {
    constructor() {
        super();
    }

    render() {
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
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PreferencesPage;