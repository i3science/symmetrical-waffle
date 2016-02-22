import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import authenticationStore from '../../../stores/AuthenticationStore';

class AccountEditPage extends React.Component {
    constructor() {
        super();
        this.state = {
            user: authenticationStore.getCurrentUser()
        };
        this._handleChange = this._handleChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillMount() {
    }
    _handleChange(event) {
        let value = event.target.value;
        let id = event.target.id;

        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        if (event.target.type === 'radio') {
            id = event.target.name;
            value = event.target.id;
        }
        if (!event.target.dataset.parent) {
            this.state.user[id] = value;
        } else {
            this.state.user[event.target.dataset.parent][id] = value;
        }
        this.setState({user: this.state.user});
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
                        <div className="row">
                            <div className="col s6">
                                <InputText
                                    id="first"
                                    label="First Name"
                                    val={this.state.user.name.first}
                                    parent="name"
                                    onChange={this._handleChange}
                                    active
                                />
                            </div>
                            <div className="col s6">
                                <InputText
                                    id="lastname"
                                    label="Last Name"
                                    val={this.state.user.name.last}
                                    parent="name"
                                    onChange={this._handleChange}
                                    active
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <InputText
                                    id="email"
                                    label="Email Address"
                                    val={this.state.user.email}
                                    onChange={this._handleChange}
                                    active
                                />
                            </div>
                            <div className="col s6">
                                <InputText
                                    id="timezone"
                                    label="Time Zone"
                                    val={this.state.user.timezone}
                                    onChange={this._handleChange}
                                    active
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <InputText
                                    type="password"
                                    id="password"
                                    label="Password"
                                    val={this.state.user.password}
                                    onChange={this._handleChange}
                                    active
                                />
                            </div>
                            <div className="col s6">
                                <InputText
                                    type="password"
                                    id="confirm"
                                    label="Confirm Password"
                                    val={this.state.user.confirm}
                                    onChange={this._handleChange}
                                    active
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col 12" style={{float: 'none'}}>
                        <button to="" onClick={this._onSubmit} className="teal waves-effect waves-light btn-large right">Save Changes</button>
                    </div>
                </div>
            </div>
        );
    }

}
export default AccountEditPage;