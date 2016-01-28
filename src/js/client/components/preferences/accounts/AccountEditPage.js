import React from 'react'; // eslint-disable-line no-unused-vars
import userService from '../../../services/UserService';
import { Link } from 'react-router';
import Input from '../../elements/input';
import InputText from '../../elements/inputtext';



class AccountEditPage extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: {
                    first: '',
                    last: ''
                },
                email: ''
            }
        };
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillMount() {
        this.service = this.props.route.service || userService;
        if (this.props.params.id) {
            var self = this;
            this.setState({ loaded: false });
            this.service
            .find(this.props.params.id)
            .then(function(user){
            self.setState({ loaded: true, user: user });
            });
        }
    }

    _onSubmit(ev) {
        ev.preventDefault();
        this.service.save(this.state.user)
            .then(function(){
                alert('Created!');
            });
    }

    render() {
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <h4 className="center-align">Create an Influencer</h4><br />
                    <div className="row">
                        <div className="col s8" style={{float: 'none', margin: '0 auto'}}>
                            <InputText
                                id="firstname"
                                label="First Name"
                                color="teal"
                                active={true}
                            />
                            <InputText
                                id="lastname"
                                label="Last Name"
                                color="teal"
                                active={true}
                            />
                            <InputText
                                id="email"
                                label="Email Address"
                                color="teal"
                                active={true}
                            />
                            <InputText
                                id="timezone"
                                label="Time Zone"
                                color="teal"
                                active={true}
                            />
                            <InputText
                                id="username"
                                label="Username"
                                color="teal"
                                active={true}
                            />
                            <InputText
                                id="password"
                                label="Password"
                                color="teal"
                                active={true}
                            />
                            <InputText
                                id="confirm"
                                label="Confirm Password"
                                color="teal"
                                active={true}
                            />
                            <div className="col 12" style={{float: 'none'}}>
                                <Link to="" className="blue-grey lighten-3 waves-effect waves-light btn-large">Cancel</Link>
                                <Link to="" className="teal waves-effect waves-light btn-large right">Save Changes</Link>
                            </div>
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



                <div className="card-panel z-depth-4" style={{display: 'none'}}>
                    <h4>Create an Influencer</h4>
                        <form>
                            <div className="row">

                                <div className="col s2">First Name</div>
                                <div className="col s10"><Input name="first_name" property="state.user.name.first" this={this}/></div>
                                <div className="col s2">Last Name</div>
                                <div className="col s10"><Input name="last_name" property="state.user.name.last" this={this}/></div>
                                <div className="col s2">Email Address</div>
                                <div className="col s10"><Input name="email_address" property="state.user.email" this={this}/></div>
                                <div className="col s2">Timezone</div>
                                <div className="col s10"><input type="text" name="timezone" id="timezone"/></div>

                                <input type="submit" value="Save"/>
                            </div>
                        </form>
                </div>
            </div>
        );
    }

}
export default AccountEditPage;