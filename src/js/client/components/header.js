import React from 'react';
import { Link } from 'react-router';
import Breadcrumbs from './breadcrumbs';

class Header extends React.Component {
    render() {
        return (
            <header className="z-depth-1" >
                <div className="white-text teal darken-2">
                    <div className="container valign-wrapper" style={{height:'40px'}}>
                        <p className="right-align valign" style={{width:'95%',margin:'0 auto'}}>
                            Your Name
                        </p>
                    </div>
                </div>
                <nav className="teal">
                    <div className="nav-wrapper container">
                        <div className="col s12">
                            <Breadcrumbs
                                path={this.props.path}
                            />
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