import React from 'react';
import LoginForm from './loginform';

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
                        <h3 className="center" style={{margin: '10% 0'}}>Social Marketplace Platform</h3>
                        <LoginForm />
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