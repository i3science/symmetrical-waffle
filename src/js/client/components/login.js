import React from 'react';
import LoginForm from './loginform';
import authenticationActions from '../actions/AuthenticationActions';
import authenticationService from '../services/AuthenticationService';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            dirty: false
        };
        this.setUserState = this.setUserState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setUserState(event) {
        this.setState({dirty: true});
        this.state.user[event.target.ref] = event.target.value;
        this.setState({user: this.state.user});
    }

    handleSubmit(obj, event) {
        event.preventDefault();
        const email = obj.refs.email.value;
        const pass = obj.refs.pass.value;
        authenticationService.signin(email, pass)
            .then(function(jwt){
                // We trigger the LoginAction with that JWT.
                authenticationActions.userAuthenticated(jwt);
            });
    }

    render() {
        return (
            <div className="card-panel z-depth-4">
                <div className="row">
                    <div className="col s2">&nbsp;</div>
                    <div className="col s8">
                        <h3 className="center" style={{margin: '10% 0'}}>Social Marketplace Platform</h3>
                        <LoginForm
                            handleSubmit={this.handleSubmit}
                        />
                        <div className="teal-text text-darken-1 center-align">
                            <p><strong>Forgot your password?</strong><br />
                                Not a user? Contact us here!</p>
                            <br />
                            <p><small>Copyright &copy; 2015 JONES MEDIA INC.  All Rights Reserved.</small></p>
                        </div>
                    </div>

                    <div className="col s2">&nbsp;</div>
                </div>
            </div>

        );
    }
}
export default Login;