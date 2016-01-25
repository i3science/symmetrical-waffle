import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';

const ListResult = (props) => {
    return (
        <div className="col m3 s2">
            <div className="card">
                <div className="card-content">
                    <span className="card-title teal-text text-darken-1">List Name:</span>
                    <p><strong>{props.list.name}</strong></p>
                    <br />
                    <p><strong>Date Added:</strong></p>
                    <p>Live Date: {props.list.added}</p>
                </div>
                <div className="card-action grey lighten-5">
                    <Link to="">More Info...</Link>
                </div>
            </div>
        </div>
    );
};

export default ListResult;