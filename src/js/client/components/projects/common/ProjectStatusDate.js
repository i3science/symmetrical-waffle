import React from 'react'; // eslint-disable-line no-unused-vars
import InputDate from '../../common/input/inputdate';
import moment from 'moment';

const ProjectStatusDate = (props) => {
    return (
        <div className="row">
            <div className="col s6">
                <p>{props.label}</p>
            </div>
            <div className="col s6">
                <InputDate
                    id={props.id}
                    parent={props.parent || null}
                    date={moment(props.val).format('MM/DD/YYYY') || ''}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default ProjectStatusDate;