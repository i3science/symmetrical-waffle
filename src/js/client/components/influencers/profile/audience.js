import React from 'react';

class Audience extends React.Component {
    render() {
        if (!this.props.audience) {
            return '';
        }
        var padit = 20;
        return (
            <table className="bordered grey-text text-darken-3">
                <tbody>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Sex <span className="right teal-text text-lighten-2">{this.props.audience.sex}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>Language <span className="right teal-text text-lighten-2">{this.props.audience.language}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>Age <span className="right teal-text text-lighten-2">{this.props.audience.age && this.props.audience.age.start + ' - ' + this.props.audience.age.end}</span></div></td>
                </tr>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Married <span className="right teal-text text-lighten-2">{this.props.audience.married?'Yes':'No'}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>Number of Kids <span className="right teal-text text-lighten-2">{this.props.audience.kids.length||0}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>Kids Ages <span className="right teal-text text-lighten-2">{this.props.audience.kids.join(', ')||'-'}</span></div></td>
                </tr>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Country <span className="right teal-text text-lighten-2">{this.props.audience.country}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>Province <span className="right teal-text text-lighten-2">{this.props.audience.region}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>City <span className="right teal-text text-lighten-2">{this.props.audience.city}</span></div></td>
                </tr>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Home <span className="right teal-text text-lighten-2">{this.props.audience.residence}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>Household Income <span className="right teal-text text-lighten-2">{this.props.audience.householdIncome}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>Pets <span className="right teal-text text-lighten-2">{this.props.audience.pets.length||0}</span></div></td>
                </tr>
                <tr>
                    <td style={{width: '33.3333%'}}><div style={{paddingRight: padit + '%'}}>Types of Pets <span className="right teal-text text-lighten-2">{this.props.audience.pets.join(', ')||'-'}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{padding: '0 ' + padit/2 + '%'}}>Ethnicity <span className="right teal-text text-lighten-2">{this.props.audience.ethnicity}</span></div></td>
                    <td style={{width: '33.3333%'}}><div style={{paddingLeft: padit + '%'}}>&nbsp;</div></td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default Audience;