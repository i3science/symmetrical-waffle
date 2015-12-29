import React from 'react'; // eslint-disable-line no-unused-vars
import Header from './header';

export default (props) => {
    return (
        <div>
            <Header
                path={props.location.pathname}
            />
            <div className="container section">
                {props.children}
            </div>
        </div>
    );
};