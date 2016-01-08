import React from 'react';
import userService from '../../services/UserService';
import Loader from 'react-loader';
import Input from '../elements/input.js';

class AccountEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: true,
            user: {
                name: {
                    first: '',
                    last: ''
                },
                email: ''
            }
        };
    }
    componentWillMount() {
        if (this.props.params.id) {
            var self = this;
            this.setState({ loaded: false });
            userService
                .find(this.props.params.id)
                .then(function(user){
                    self.setState({ loaded: true, user: user });
                });
        }
    }

    _onSubmit(ev) {
        ev.preventDefault();
        userService
            .save(this.state.user)
            .then(function(response){
                alert(response);
            });
    }

    render() {
        return (
            <div className="card-panel z-depth-4">
                <Loader loaded={this.state.loaded}>
                    <form onSubmit={this._onSubmit.bind(this)}>
                        <div className="row">
                            <div className="col s2">First Name</div>
                            <div className="col s10"><Input name="first_name" property="state.user.name.first" this={this}/></div>
                            <div className="col s2">Last Name</div>
                            <div className="col s10"><Input name="last_name" property="state.user.name.last" this={this}/></div>
                            <div className="col s2">Email Address</div>
                            <div className="col s10"><Input name="email_address" property="state.user.email" this={this}/></div>
                            <div className="col s2">Timezone</div>
                            <div className="col s10"><input type="text" name="timezone" id="timezone"/></div>

                            <input type="submit" value="Save"/>
                        </div>
                    </form>
                </Loader>
            </div>
        );
    }

}
export default AccountEdit;