import React from 'react';
import authenticationActions from '../actions/AuthenticationActions';
import authenticationService from '../services/AuthenticationService';

class Login extends React.Component {

    onSubmit(ev) {
        ev.preventDefault();

        //let form = new FormData(document.getElementById('login_form'));
        authenticationService.signin(
            //form.get('email'),
            //form.get('password'))
            'admin@smt.com', 'admin123')
            .then(function(jwt){
                // We trigger the LoginAction with that JWT.
                authenticationActions.userAuthenticated(jwt);
            });
    }

    render() {
        return (
            <form action="/auth/signin" method="post" onSubmit={this.onSubmit} id="login_form">
                <input type="text" name="email"/>
                <input type="password" name="password"/>
                <input type="submit" value="Sign In"/>
            </form>
        );
    }
}
export default Login;