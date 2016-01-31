import React from 'react';
import { Link } from 'react-router';
import authenticationService from '../../services/AuthenticationService';
import { __ } from '../../utils/i18n';

class ResetPasswordForm extends React.Component {

    constructor() {
        super();
        this.state = {
            success: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        authenticationService
            .resetPassword(
                this.props.token,
                this.refs.pass.value,
                this.refs.confirmpass.value)
            .then(() => {
                this.setState({ success: true });
            });
    }

    render() {
        if (this.state.success) {
            return (<p className="center">Your password has been reset. <Link to="/login">Login</Link> to continue</p>);
        }

        return (
            <form id="reset-password-form" onSubmit={this.handleSubmit}>
                <input type="hidden" value={this.props.token} />
                <input id="pass" ref="pass" type="password" placeholder={__('forgotpassword.password')} />
                <input id="confirmpass" ref="confirmpass" type="password" placeholder={__('forgotpassword.confirm_password')} />
                <br /><br />
                <div className="center-align" style={{marginBottom: '30px'}}>
                    <button type="submit" id="reset-password-submit" className="btn waves-light btn-large">{__('forgotpassword.reset')}</button>
                </div>
            </form>
        );
    }
}

export default ResetPasswordForm;