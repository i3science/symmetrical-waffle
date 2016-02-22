import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import moment from 'moment';

const ListItem = (props) => {
    return (
        <div className="col m3 s2">
            <div className="card">
                {!props.project ? '' :
                    <a
                        className="teal white-text z-depth-1"
                        style={{position: 'absolute', right: '0', cursor: 'pointer', padding: '4px'}}
                        onClick={props.addList.bind(this, props.list._id, props.project)}
                    ><i className="material-icons">add</i></a>
                }
                <div className="card-content">
                    <span className="card-title teal-text text-darken-1">List Name:</span>
                    <p><strong>{props.list.name}</strong></p>
                    <br />
                    <p><strong>Date Added:</strong></p>
                    <p>Live Date: {moment(props.list.created).format('DD/MM/YYYY')}</p>
                </div>
                <div className="card-action grey lighten-5">
                    <Link to={'/lists/list/' + props.list._id}>More Info...</Link>
                </div>
            </div>
        </div>
    );
};

export default ListItem;