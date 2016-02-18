import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Sidebar from '../sidebar';
import Calendar from '../influencers/profile/calendar';
import InputDate from '../common/input/inputdate';

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
            dates: [],
            inputDate: {}
        };
        this._handleDates = this._handleDates.bind(this);
        this._handleDate = this._handleDate.bind(this);
    }
    _handleDates(dates, id){
        this.state.dates[id] = dates;
        this.setState({dates: this.state.dates});
    }
    _handleDate(date, id){
        this.state.inputDate[id] = date;
        this.setState({inputDate: this.state.inputDate});
    }

    render() {
        return (
            <div>
                <div className="card-panel">
                    <div>
                        <InputDate
                            id="profileDates"
                            propdate={this.state.inputDate.profileDates || ''}
                            onChange={this._handleDate}
                        />
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