import React from 'react'; // eslint-disable-line no-unused-vars
import authenticationStore from '../../stores/AuthenticationStore';
import { Link } from 'react-router';

class UserMenu extends React.Component {
    constructor() {
        super();
        this.state = {};
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
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
                <Link to="/preferences" className="white-text" style={{marginRight: '10px'}}><i className="material-icons">settings</i></Link>
                {this.state.user ? this.state.user.name.first + ' ' + this.state.user.name.last : 'Your Name'}
            </p>
        );
    }
}

export default UserMenu;