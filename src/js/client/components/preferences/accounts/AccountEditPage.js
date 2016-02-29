import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import authenticationStore from '../../../stores/AuthenticationStore';
import Actions from '../../../actions/UiActions';

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

        let file = $(event.target).find('input[type="file"]')[0].files[0];
        if (!file) {
            // TODO Error no file given
            return;
        }

        let self = this;
        let reader = new FileReader();
        reader.addEventListener('load', function(){
            let user = this.state.user;
            user.image = reader.result;
            Actions.updateUser(self.state.user);
            this.setState({ user: user });
        }.bind(this), false);
        reader.readAsDataURL(file);
    }
    render() {

        let user_image = (<img className="circle responsive-img" src="/assets/images/default.jpg"/>);
        if (this.state.user.image) {
            user_image = (<div className="circle responsive-img" style={{
                background: 'url('+this.state.user.image+') no-repeat rgba(0,0,0,0.3) 50%',
                backgroundSize: 'cover',
                width: '100%',
                padding: '50%' }}/>);
        }

        return (
            <div className="card-panel z-depth-4">
                <h4 className="center-align">Edit Your Account</h4><br />
                <form action={'/users/'+this.state.user._id} onSubmit={this._onSubmit} method="put" encType="multipart/form-data">
                    <div className="row">
                        <div className="col s8" style={{float: 'none', margin: '0 auto'}}>
                            <div className="row">
                                <div className="col s2">
                                    {user_image}
                                </div>
                                <div className="col s10">
                                    <div className="file-field input-field">
                                        <div className="btn">
                                            <span>File</span>
                                            <input type="file" name="file" id="file"/>
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <button type="submit" className="teal waves-effect waves-light btn-large right">Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}
export default AccountEditPage;