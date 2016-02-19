import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Sidebar from '../sidebar';
import Calendar from '../influencers/profile/calendar';
import InputDate from '../common/input/inputdate';
//import AuthenticationStore from '';

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

class PreferencesPage extends React.Component {
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