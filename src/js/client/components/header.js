import React from 'react';
import { Link } from 'react-router';
import UserMenu from './UserMenu';
import Breadcrumbs from './breadcrumbs';

class Header extends React.Component {
    constructor() {
        super();
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
                                <ul className="tabs">
                                    <li className="tab col s3"><Link to="/search">SEARCH</Link></li>
                                    <li className="tab col s3"><Link to="/projects">PROJECTS</Link></li>
                                    <li className="tab col s3"><Link to="/search">LISTS</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;