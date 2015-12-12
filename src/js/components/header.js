import React from 'react';
import { Router, Link } from 'react-router';
// <Link to="/profile">Profile</Link>  <Link to="/search">Search</Link>
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
                <div className="teal">
                    <br/>
                    <br/>
                    <br/>
                </div>
                <br/>
                <br/>
            </header>
        );
    }
}

export default Header;