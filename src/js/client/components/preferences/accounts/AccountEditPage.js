import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import InputText from '../../common/input/inputtext';

var fakeUser = {
    _id: '56c548dc1159249c1d26b832',
    active: true,
    created: '2016-02-18T04:30:20.363Z',
    email: 'admin@smp.com',
    language: 'en_CA',
    name: {
        first: 'Administrative',
        last: 'User'
    },
    roles: ['admin'],
    0: 'admin',
    length: 1,
    updated: '2016-02-18T04:30:20.364Z'
};

class AccountEditPage extends React.Component {
    constructor() {
        super();
        this.state = {
            user: fakeUser
        };
        this._handleChange = this._handleChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillMount() {
    }
    _handleChange() {

    }
    _onSubmit(event) {
        event.preventDefault();

    }

    render() {
        return (
            <div className="card-panel z-depth-4">
                <h4 className="center-align">Edit Your Account</h4><br />
                <div className="row">
                    <div className="col s8" style={{float: 'none', margin: '0 auto'}}>
                        <form onSubmit={this._onSubmit}>
                            <InputText
                                id="firstname"
                                label="First Name"
                                active
                            />
                            <InputText
                                id="lastname"
                                label="Last Name"
                                active
                            />
                            <InputText
                                id="email"
                                label="Email Address"
                                active
                            />
                            <InputText
                                id="timezone"
                                label="Time Zone"
                                active
                            />
                            <InputText
                                id="username"
                                label="Username"
                                active
                            />
                            <InputText
                                type="password"
                                id="password"
                                label="Password"
                                active
                            />
                            <InputText
                                id="confirm"
                                label="Confirm Password"
                                active
                            />
                            <div className="col 12" style={{float: 'none'}}>
                                <button to="" onClick={this._onSubmit} className="teal waves-effect waves-light btn right">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr />
                <div className="row center-align">
                    <h6 className="teal-text" style={{marginBottom: '20px'}}>Send to influencer for them to complete</h6>
                    <br />
                    <Link to="" className="teal waves-effect waves-light btn-large center">
                        <i className="material-icons right">send</i>Send
                    </Link>
                </div>
            </div>
        );
    }

}
export default AccountEditPage;