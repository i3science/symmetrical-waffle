import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Sidebar from '../sidebar';

const PreferencesSidebar = () => {
    return (
        <div>
            <header className='teal lighten-4 white-text valign-wrapper center-align' style={{height: '40px'}}>
                <h6 style={{width: '100%'}}>PREFERENCES</h6>
            </header>
            <li><Link to="/preferences/accounts/me">My Account</Link></li>
            <li><Link to="/preferences/influencers">Influencers</Link></li>
            <li><Link to="/preferences/clients">Clients</Link></li>
        </div>
    );
};

class PreferencesPage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Sidebar>
                    <PreferencesSidebar />
                </Sidebar>
                {this.props.children}
            </div>
        );
    }
}

export default PreferencesPage;