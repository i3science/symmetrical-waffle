import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Sidebar from '../sidebar';
import Calendar from '../influencers/profile/calendar';

const PreferencesSidebar = (props) => {
    return (
        <div>
            <header className={(props.color ? props.color : 'teal lighten-1') + ' white-text valign-wrapper center-align'} style={{height: '40px'}}>
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
        this.state = {
            dates: ['02/10/2016', '02/11/2016']
        };
        this._handleDates = this._handleDates.bind(this);
    }
    _handleDates(dates){
        this.setState({dates: dates});
    }

    render() {
        return (
            <div>
                <div className="card-panel">
                    <div>
                        <Calendar
                            id="profileDates"
                            dates={this.state.dates}
                            onChange={this._handleDates}
                        />
                        <Calendar
                            id="profileDates3"
                            full
                            dates={this.state.dates}
                            disabled
                            onChange={this._handleDates}
                        />
                        <Calendar
                            id="profileDates2"
                            panels="2"
                            dates={this.state.dates}
                            onChange={this._handleDates}
                        />
                        <Calendar
                            id="profileDates4"
                            panels="2"
                            full
                            dates={this.state.dates}
                            onChange={this._handleDates}
                        />
                    </div>
                </div>
                <Sidebar>
                    <PreferencesSidebar />
                </Sidebar>
                {this.props.children}
            </div>
        );
    }
}

export default PreferencesPage;