import React from 'react';
import CheckBox from '../elements/checkbox';
import InputText from '../elements/inputtext';
import _ from 'lodash';
import Verticals from './verticals';

var persCollection = {
    mediums: {
        name: 'They must be a...',
        medium: [
            {
                id: 'blogger',
                label: 'Blogger'
            },
            {
                id: 'vlogger',
                label: 'Vlogger'
            },
            {
                id: 'plogger',
                label: 'Photo Blogger'
            },
            {
                id: 'amplifier',
                label: 'Amplifier'
            }
        ]
    },
    locations: {
        name: 'Geographic Location',
        location: [
            {
                id: 'country',
                label: 'Country'
            },
            {
                id: 'state',
                label: 'State/Province'
            },
            {
                id: 'city',
                label: 'City'
            }
        ]
    }
};


const Personal = (props) => {


    let mediums = persCollection.mediums.medium.map(item => {
        let checked = '';
        let filterIndex = _.findIndex(props.filters, {id: item.id, val: true});
        if (filterIndex > -1) {
            checked = 'checked';
        }
        return (
            <div key={item.id} className="col s3">
                <CheckBox
                    id={item.id}
                    label={item.label}
                    onChange={props.onChange}
                    checked={checked}
                />
            </div>
        );
    });

    let location = persCollection.locations.location.map(item => {
        let inputVal = '';
        let filterValue = _.find(props.filters, {id: item.id});
        if (filterValue) {
            inputVal = filterValue.val;
        }
        return (
            <div key={item.id} className="col s4">
                <InputText
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    onChange={props.onChange}
                    val={inputVal}
                />
            </div>
        );
    });

    return (
        <div>
            <h6 className="teal-text">Geographic Location</h6>
            <div className="row">
                {location}
            </div>
            <h6 className="teal-text">They must be a...</h6>
            <div className="row">
                {mediums}
            </div>
        </div>
    );
};


class Filters extends React.Component {
    render() {
        return (
            <div className="card-panel">
                <h4>Search Criteria</h4>
                <h6 className="teal-text">I am looking for an influencer...</h6>

                <hr />
                <h5 className="teal-text">Personal</h5>
                <Personal
                    onChange={this.props.onChange}
                    filters={this.props.filters}
                />
                <hr />
                <h5 className="teal-text">Verticals</h5>
                <Verticals
                    onChange={this.props.onChange}
                    filters={this.props.filters}
                />
            </div>
        );
    }
}

export default Filters;