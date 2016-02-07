import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../elements/inputtext';
import moment from 'moment';

const ProjectCheckpoint = (props) => {
    return (
        <div className="row">
            <div className="col s6">
                <p>{props.label}</p>
            </div>
            <div className="col s6">
                <InputText
                    id={props.id}
                    val={moment(props.val).format('DD/MM/YYYY') || null}
                    col={false}
                    active={true}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default ProjectCheckpoint;