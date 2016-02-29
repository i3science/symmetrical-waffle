import React from 'react'; // eslint-disable-line no-unused-vars
import moment from 'moment';
import _ from 'lodash';
import Calendar from '../../../components/influencers/profile/calendar';

export default (props) => {
    let dates = props.dates || false;
    let events = props.events || false;
    if (events) {
        events = _.sortBy(events, function(o) { return moment(o.date).toDate(); });
        dates = events.map((ev) => {
            return moment(ev.date).format('MM/DD/YYYY');
        });
    }

    let activities = (events || []).map((event, i) => {
        if (moment().unix() < moment(event.date).unix()) {
            return (
                <p key={i}>{moment(event.date).format('Do MMM')} - {event.title}</p>
            );
        }
    });
    console.log(props.project);

    return (
        <div className="row">
            <div className="col s8">
                <Calendar
                    id="activities"
                    disabled
                    dates={dates}
                    full
                />
            </div>
            <div className="col s4">
                <h5>Activities List</h5>
                {activities}
            </div>
        </div>
    );
};