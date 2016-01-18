import React from 'react';
import authenticationActions from '../actions/AuthenticationActions';
import authenticationService from '../services/AuthenticationService';

class LoginForm extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = '' || this.refs.email.value;
        const pass = '' || this.refs.pass.value;
        authenticationService.signin(user, pass)
            .then(function(jwt){
                // We trigger the LoginAction with that JWT.
                authenticationActions.userAuthenticated(jwt);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input ref="email" type="text" placeholder="email" defaultValue="admin@smp.com" />
                <input ref="pass" type="password" placeholder="password" />
                <br /><br />
                <div className="center-align" style={{marginBottom: '30px'}}>
                    <button type="submit" className="btn waves-light btn-large">Sign In</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;

