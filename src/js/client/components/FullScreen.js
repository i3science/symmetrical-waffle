import React from 'react'; // eslint-disable-line no-unused-vars
import Footer from './footer';

export default (props) => {
    return (
        <div style={{height: '100%'}}>
            <div className="teal valign-wrapper" style={{height: '100%'}}>
                <div className="container section">
                    {props.children}
                </div>
            </div>
            <Footer />
        </div>
    );
};