import React from 'react';
import { Link } from 'react-router';
import Actions from '../../../actions/UiActions';
import Input from '../../elements/input';
import InputText from '../../elements/inputtext';



class InfluencerCreatePage extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: {
                    first: '',
                    last: ''
                },
                email: ''
            },
            influencer: {
                name: {
                    first: '',
                    last: ''
                }
            }

        };
        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillMount() {
        // update user action
        //this.service = this.props.route.service || influencerService;
        //if (this.props.params.id) {
        //    var self = this;
        //    this.setState({ loaded: false });
        //    this.service
        //        .find(this.props.params.id)
        //        .then(function(user){
        //            self.setState({ loaded: true, user: user });
        //        });
        //}
    }
    _onChange(event) {
        switch (event.target.id) {
            case 'firstname':
                this.state.influencer.name.first = event.target.value;
                break;
            case 'lastname':
                this.state.influencer.name.last = event.target.value;
                break;
            default:
                this.state.influencer[event.target.id] = event.target.value;
        }
        this.setState({influencer: this.state.influencer});
    }

    _onSubmit(event) {
        event.preventDefault();
        Actions.createInfluencer(this.state.influencer);
    }

    render() {
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <h4 className="center-align">Create an Influencer dfsdasfasdfasfds</h4><br />
                    <div className="row">
                        <div className="col s8" style={{float: 'none', margin: '0 auto'}}>
                            <InputText
                                id="firstname"
                                label="First Name"
                                val={this.state.influencer.name.first}
                                active={true}
                                onChange={this._onChange}
                            />
                            <InputText
                                id="lastname"
                                label="Last Name"
                                val={this.state.influencer.name.last}
                                active={true}
                                onChange={this._onChange}
                            />
                            <InputText
                                id="email"
                                label="Email Address"
                                type="email"
                                val={this.state.influencer.email}
                                active={true}
                                onChange={this._onChange}
                            />
                            <InputText
                                id="timezone"
                                label="Time Zone"
                                val={this.state.influencer.timezone}
                                active={true}
                                onChange={this._onChange}
                            />
                            <InputText
                                id="username"
                                label="Username"
                                val={this.state.influencer.username}
                                active={true}
                                onChange={this._onChange}
                            />
                            <InputText
                                id="password"
                                label="Password"
                                type="password"
                                val={this.state.influencer.password}
                                active={true}
                                onChange={this._onChange}
                            />
                            <InputText
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                val={this.state.influencer.confirmPassword}
                                active={true}
                                onChange={this._onChange}
                            />
                            <div className="col 12" style={{float: 'none'}}>
                                <Link to="" className="blue-grey lighten-3 waves-effect waves-light btn-large">Cancel</Link>
                                <Link to="" className="teal waves-effect waves-light btn-large right" onClick={this._onSubmit}>Save Changes</Link>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row center-align">
                        <h6 className="teal-text" style={{marginBottom: '20px'}}>Send to influencer for them to complete</h6>
                        <br />
                        <Link to="" className="teal waves-effect waves-light btn-large center">
                            <i className="material-icons right">send</i>Send
                        </Link>
                    </div>
                </div>



                <div className="card-panel z-depth-4" style={{display: 'none'}}>
                    <h4>Create an Influencer</h4>
                    <form>
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
                </div>
            </div>
        );
    }

}
export default InfluencerCreatePage;