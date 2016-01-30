import React from 'react';
import authenticationActions from '../../actions/AuthenticationActions';
import { __ } from '../../utils/i18n';

class ForgotPasswordForm extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        authenticationActions.requestPasswordReset('' || this.refs.email.value);
    }

    render() {
        return (
            <form id="forgot-password-form" onSubmit={this.handleSubmit}>
                <input id="email" ref="email" type="text" placeholder={__('forgotpassword.email')} />
                <br /><br />
                <div className="center-align" style={{marginBottom: '30px'}}>
                    <button type="submit" id="forgot-password-submit" className="btn waves-light btn-large">{__('forgotpassword.request_reset')}</button>
                </div>
            </form>
        );
    }
}

export default ForgotPasswordForm;