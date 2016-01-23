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
            .then(function(response){
                if (response.status !== 200 || !response.content._id) {
                    return;
                }

                // We trigger the LoginAction with that JWT.
                authenticationActions.userAuthenticated(response.content);
            })
            .catch(function(err){
                console.log('Failure: ', arguments);
            });
    }

    render() {
        return (
            <form id="login-form" onSubmit={this.handleSubmit}>
                <input id="email" ref="email" type="text" placeholder="email" defaultValue="admin@smp.com" />
                <input id="pass" ref="pass" type="password" placeholder="password" />
                <br /><br />
                <div className="center-align" style={{marginBottom: '30px'}}>
                    <button type="submit" id="login-submit" className="btn waves-light btn-large">Sign In</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;

