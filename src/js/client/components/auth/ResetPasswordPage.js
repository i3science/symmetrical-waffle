import React from 'react';
import FullScreen from '../FullScreen';
import ResetPasswordForm from './ResetPasswordForm';
import { __ } from '../../utils/i18n';

class ResetPasswordPage extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            dirty: false
        };
    }

    componentDidMount() {
        this.setState({ token: this.props.location.query.token});
    }

    render() {
        return (
            <FullScreen>
                <div className="card-panel z-depth-4">
                    <div className="row">
                        <div className="col s2">&nbsp;</div>
                        <div className="col s8">
                            <h3 className="center" style={{margin: '10% 0'}}>{__('application.title')}</h3>
                            <ResetPasswordForm token={this.state.token} />
                        </div>
                        <div className="col s2">&nbsp;</div>
                    </div>
                </div>
            </FullScreen>
        );
    }
}
export default ResetPasswordPage;