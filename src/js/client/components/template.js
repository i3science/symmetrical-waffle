import React from 'react';
import Header from './header';

export default (props) => {
    return (
        <div>
            <Header />
            <div className="container section">
                {props.children}
            </div>
        </div>
    );
};