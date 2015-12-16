import React from 'react';

class Audience extends React.Component {
    render() {
        return (
            <table className="bordered grey-text text-darken-3">
                <thead>
                </thead>
                <tbody>
                <tr>
                    <td>Sex <span className="right teal-text">{this.props.audience.sex}</span></td><td></td>
                    <td>Language <span className="right teal-text">{this.props.audience.language}</span></td><td></td>
                    <td>Age <span className="right teal-text">{this.props.audience.age}</span></td>
                </tr>
                <tr>
                    <td>Married <span className="right teal-text">{this.props.audience.married}</span></td><td></td>
                    <td>Number of Kids <span className="right teal-text">{this.props.audience.kids}</span></td><td></td>
                    <td>Kids Ages <span className="right teal-text">{this.props.audience.kidsAges}</span></td>
                </tr>
                <tr>
                    <td>Country <span className="right teal-text">{this.props.audience.country}</span></td><td></td>
                    <td>Province <span className="right teal-text">{this.props.audience.provinceState}</span></td><td></td>
                    <td>City <span className="right teal-text">{this.props.audience.city}</span></td>
                </tr>
                <tr>
                    <td>Home <span className="right teal-text">{this.props.audience.dwelling}</span></td><td></td>
                    <td>Household Income <span className="right teal-text">{this.props.audience.householdIncome}</span></td><td></td>
                    <td>Pets <span className="right teal-text">{this.props.audience.pets}</span></td>
                </tr>
                <tr>
                    <td>Types of Pets <span className="right teal-text">{this.props.audience.petTypes}</span></td><td></td>
                    <td>Ethnicity <span className="right teal-text">{this.props.audience.ethnicity}</span></td><td></td>
                    <td></td>
                </tr>

                </tbody>
            </table>
        );
    }
}

export default Audience;