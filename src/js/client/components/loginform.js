import React from 'react';
import authenticationActions from '../actions/AuthenticationActions';
import { __ } from '../utils/i18n';

class LoginForm extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = '' || this.refs.email.value;
        const pass = '' || this.refs.pass.value;
        authenticationActions.signin(user, pass);
    }

    render() {
        return (
            <form id="login-form" onSubmit={this.handleSubmit}>
                <input id="email" ref="email" type="text" placeholder={__('login.email')} />
                <input id="pass" ref="pass" type="password" placeholder={__('login.password')} />
                <br /><br />
                <div className="center-align" style={{marginBottom: '30px'}}>
                    <button type="submit" id="login-submit" className="btn waves-light btn-large">{__('login:signin')}</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;

