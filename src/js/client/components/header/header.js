import React from 'react';
import UserMenu from './../UserMenu';
import Breadcrumbs from './breadcrumbs';
import Tabs from './tabs';

class Header extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        event.preventDefault();
        this.props.props.history.pushState(null, event.target.dataset.href);
    }
    render() {
        return (
            <header className="z-depth-1" >
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
                            <div className="col s2">&nbsp;</div>
                            <div className="col s8">
                                <Tabs
                                    onClick={this.onClick}
                                    routes={this.props.props.routes}
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