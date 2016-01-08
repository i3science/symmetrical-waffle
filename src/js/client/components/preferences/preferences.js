import React from 'react'; // eslint-disable-line no-unused-vars

export default (props) => {
    return (
        <div className="row">
            <div className="col s3">
                <h3>Preferences</h3>
                <ul>
                    <a href="#">My Account</a>
                    <a href="#">Influencers</a>
                    <a href="#">Clients</a>
                </ul>
            </div>
            <div className="col s9">
                {props.children}
            </div>
        </div>
    );
};