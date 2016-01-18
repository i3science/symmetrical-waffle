import React from 'react'; // eslint-disable-line no-unused-vars
import authenticationStore from '../stores/AuthenticationStore';

class UserMenu extends React.Component {
    constructor() {
        super();
        this.state = {};
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        authenticationStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        authenticationStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            user: authenticationStore.user
        });
    }

    render() {
        return (
            <p className="right-align valign" style={{width:'95%',margin:'0 auto'}}>
                {this.state.user ? this.state.user.name.first + ' ' + this.state.user.name.last : 'Your Name'}
            </p>
        );
    }
}

export default UserMenu;