import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import Calendar from '../../influencers/profile/calendar';
import authenticationStore from '../../../stores/AuthenticationStore';
import Actions from '../../../actions/UiActions';

class AvailabilityPage extends React.Component {
    constructor() {
        super();
        this.state = {
            user: authenticationStore.getCurrentUser()
        };
        this._handleChange = this._handleChange.bind(this);
    }

    componentWillMount() {
    }
    _handleChange(dates) {
        this.setState({
            user: {
                availability: dates
            }
        });
        console.log(this.state.user.availability);
        Actions.updateUser(this.state.user);
    }
    render() {
        return (
            <div className="card-panel z-depth-4">
                <h4 className="center-align">Edit Your Availability</h4><br />
                <div className="center-align" style={{padding: '30px 0'}}>
                    <Calendar
                        id="availability"
                        panels="2"
                        dates={this.state.user.availability}
                        onChange={this._handleChange}
                    />
                </div>
            </div>
        );
    }

}
export default AvailabilityPage;