import React from 'react';
import UserMenu from './UserMenu';
import Breadcrumbs from './breadcrumbs';
import Tabs from './tabs';
import authenticationStore from '../../stores/AuthenticationStore';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            user: authenticationStore.getCurrentUser()
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        event.preventDefault();
        this.props.props.history.pushState(null, event.target.dataset.href);
    }
    render() {
        return (
            <header className="z-depth-1" >
                <a style={{display: 'none'}} href="#" data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
                <div className="white-text teal darken-2">
                    <div className="container valign-wrapper" style={{height:'40px'}}>
                        <UserMenu />
                    </div>
                </div>
                <nav className="teal">
                    <div className="nav-wrapper container">
                        <div className="col s12">
                            <Breadcrumbs
                                props={this.props.props} />
                        </div>
                    </div>
                </nav>
                <div className="white">
                    <div className="container">
                        <div className="row">
                            <div className="col s8" style={{margin: '0 auto', float: 'none'}}>
                                <Tabs
                                    onClick={this.onClick}
                                    routes={this.props.props.routes}
                                    roles={this.state.user.roles}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;