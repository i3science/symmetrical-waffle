import React from 'react'; // eslint-disable-line no-unused-vars
import Calendar from '../../../components/influencers/profile/calendar';

export default (props) => {
    return (
        <div className="row">
            <div className="col s8">
                <Calendar
                    id="activities"
                    disabled
                    dates={props.dates || false}
                    full
                />
            </div>
            <div className="col s4">
                <h5>Activities List</h5>
                <p>First thing</p>
                <p>Second thing</p>
                <p>Third thing</p>
            </div>
        </div>
    );
};