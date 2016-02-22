import React from 'react';

class Personal extends React.Component {
    render() {
        if (!this.props.personal) {
            return <div></div>;
        }
        var padit = 20;
        return (
            <table className="bordered grey-text text-darken-3">
                <tbody>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Gender <span className="right teal-text text-lighten-2">{this.props.personal.sex}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>Language <span className="right teal-text text-lighten-2">{this.props.personal.language}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>Age <span className="right teal-text text-lighten-2">{this.props.personal.age}</span></div></td>
                </tr>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Married <span className="right teal-text text-lighten-2">{this.props.personal.married?'Yes':'No'}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>Number of Kids <span className="right teal-text text-lighten-2">{this.props.personal.kids.length||0}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>Kids Ages <span className="right teal-text text-lighten-2">{this.props.personal.kids}</span></div></td>
                </tr>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Country <span className="right teal-text text-lighten-2">{this.props.personal.country}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>State/Province <span className="right teal-text text-lighten-2">{this.props.personal.state}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>City <span className="right teal-text text-lighten-2">{this.props.personal.city}</span></div></td>
                </tr>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Home <span className="right teal-text text-lighten-2">{this.props.personal.residence}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>Household Income <span className="right teal-text text-lighten-2">{this.props.personal.householdIncome}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>Pets <span className="right teal-text text-lighten-2">{this.props.personal.pets.length||0}</span></div></td>
                </tr>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Types of Pets <span className="right teal-text text-lighten-2">{this.props.personal.pets}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>Ethnicity <span className="right teal-text text-lighten-2">{this.props.personal.ethnicity}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>&nbsp;</div></td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default Personal;