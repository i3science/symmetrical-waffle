import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Sidebar from '../sidebar';
import authenticationStore from '../../stores/AuthenticationStore';

const PreferencesSidebar = (props) => {
    return (
        <div>
            <header className={(props.color ? props.color : 'teal lighten-1') + ' white-text valign-wrapper center-align'} style={{height: '40px'}}>
                <h6 style={{width: '100%'}}>PREFERENCES</h6>
            </header>
            <li><Link to="/preferences/myaccount">My Account</Link></li>
            <li><Link to="/preferences/influencers">Influencers</Link></li>
            <li><Link to="/preferences/clients">Clients</Link></li>
        </div>
    );
};
const PreferencesInfSidebar = (props) => {
    return (
        <div>
            <header className={(props.color ? props.color : 'teal lighten-1') + ' white-text valign-wrapper center-align'} style={{height: '40px'}}>
                <h6 style={{width: '100%'}}>PREFERENCES</h6>
            </header>
            <li><Link to="/preferences/myaccount">My Account</Link></li>
            <li><Link to="/preferences/influencers">Influencers</Link></li>
            <li><Link to="/preferences/availability">Availability</Link></li>
        </div>
    );
};

class PreferencesPage extends React.Component {
    render() {
        let user = authenticationStore.getCurrentUser();
        let sidebarContent = () => {
            if (user.roles && user.roles.indexOf('influencer') > -1) {
                return (<PreferencesInfSidebar />);
            }
            return (<PreferencesSidebar />);
        };

        return (
            <div>
                <Sidebar>
                    {sidebarContent()}
                </Sidebar>
                {this.props.children}
            </div>
        );
    }
}

export default PreferencesPage;