import React from 'react';
import CheckBox from '../elements/checkbox';
import InputText from '../elements/inputtext';
import _ from 'lodash';
import Verticals from './verticals';



var persLocations = [
    {
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
];

var persMediums = [
    {
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
    }
];


const Personal = (props) => {
    let mustBeA = persMediums.map(item => {
        let children = item.medium.map(child => {
            let checked = '';
            let filterIndex = _.findIndex(props.filters, {id: child.id, val: true});
            if (filterIndex > -1) {
                checked = 'checked';
            }
            return (
                <div key={child.id} className="col s3">
                    <CheckBox
                        id={child.id}
                        label={child.label}
                        onChange={props.onChange}
                        checked={checked}
                    />
                </div>
            );
        });
        return (
            <div key={item.name} className="">
                <h6 className="teal-text">{item.name}</h6>
                <div key={item.name} className="row">
                    {children}
                </div>
            </div>
        );
    });

    let location = persLocations.map(item => {
        let children = item.location.map(child => {
            let inputVal = '';
            let filterValue = _.find(props.filters, {id: child.id});
            if (filterValue) {
                inputVal = filterValue.val;
            }
            return (
                <div key={child.id} className="col s4">
                    <InputText
                        key={child.id}
                        id={child.id}
                        label={child.label}
                        onChange={props.onChange}
                        val={inputVal}
                    />
                </div>
            );
        });
        return (
            <div key={item.name} className="">
                <h6 className="teal-text">{item.name}</h6>
                <div key={item.name} className="row">
                    {children}
                </div>
            </div>
        );

    });
    return (
        <div>
            {location}
            {mustBeA}
        </div>
    );
};


class Filters extends React.Component {
    shouldComponentUpdate() {
        return true;
    }
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

                <button className="btn">Add</button>
            </div>
        );
    }
}

export default Filters;