import React from 'react';

class Audience extends React.Component {
    render() {
        return (
            <table className="bordered grey-text text-darken-3">
                <thead>
                </thead>
                <tbody>
                <tr>
                    <td>Sex <span className="right teal-text text-lighten-2">{this.props.audience.sex}</span></td><td></td>
                    <td>Language <span className="right teal-text text-lighten-2">{this.props.audience.language}</span></td><td></td>
                    <td>Age <span className="right teal-text text-lighten-2">{this.props.audience.age.start} - {this.props.audience.age.end}</span></td>
                </tr>
                <tr>
                    <td>Married <span className="right teal-text text-lighten-2">{this.props.audience.married?'Yes':'No'}</span></td><td></td>
                    <td>Number of Kids <span className="right teal-text text-lighten-2">{this.props.audience.kids.length||0}</span></td><td></td>
                    <td>Kids Ages <span className="right teal-text text-lighten-2">{this.props.audience.kids.join(', ')||'-'}</span></td>
                </tr>
                <tr>
                    <td>Country <span className="right teal-text text-lighten-2">{this.props.audience.country}</span></td><td></td>
                    <td>Province <span className="right teal-text text-lighten-2">{this.props.audience.region}</span></td><td></td>
                    <td>City <span className="right teal-text text-lighten-2">{this.props.audience.city}</span></td>
                </tr>
                <tr>
                    <td>Home <span className="right teal-text text-lighten-2">{this.props.audience.residence}</span></td><td></td>
                    <td>Household Income <span className="right teal-text text-lighten-2">{this.props.audience.householdIncome}</span></td><td></td>
                    <td>Pets <span className="right teal-text text-lighten-2">{this.props.audience.pets.length||0}</span></td>
                </tr>
                <tr>
                    <td>Types of Pets <span className="right teal-text text-lighten-2">{this.props.audience.pets.join(', ')||'-'}</span></td><td></td>
                    <td>Ethnicity <span className="right teal-text text-lighten-2">{this.props.audience.ethnicity}</span></td><td></td>
                    <td></td>
                </tr>

                </tbody>
            </table>
        );
    }
}

export default Audience;