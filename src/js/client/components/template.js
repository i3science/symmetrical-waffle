import React from 'react'; // eslint-disable-line no-unused-vars
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