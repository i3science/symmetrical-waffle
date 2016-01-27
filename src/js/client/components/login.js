import React from 'react';
import LoginForm from './loginform';
import { __ } from '../utils/i18n';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            dirty: false
        };
    }

    render() {
        return (
            <div className="card-panel z-depth-4">
                <div className="row">
                    <div className="col s2">&nbsp;</div>
                    <div className="col s8">
                        <h3 className="center" style={{margin: '10% 0'}}>{__('application.title')}</h3>
                        <LoginForm />
                        <div className="teal-text text-darken-1 center-align">
                            <p><strong>{__('forgot_password')}</strong><br />
                                {__('sign_up')}</p>
                            <br />
                            <p><small>{__('legal.copyright')}</small></p>
                        </div>
                    </div>
                    <div className="col s2">&nbsp;</div>
                </div>
            </div>
        );
    }
}
export default Login;