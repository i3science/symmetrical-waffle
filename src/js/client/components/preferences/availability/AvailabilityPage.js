import React from 'react';
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
        this.state.user.availability = dates;
        this.setState({user: this.state.user});
        Actions.updateInfluencer(this.state.user);
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