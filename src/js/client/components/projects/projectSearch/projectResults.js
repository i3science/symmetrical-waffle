import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import moment from 'moment';

const ProjectResult = (props) => {
    let amplifiers = Object.keys(props.project.required_influencers).reduce((obj, val) => {
        obj += props.project.required_influencers[val];
        return obj;
    }, 0);
    return (
        <div className="col m3 s2">
            <div className="card">
                <div className="card-content">
                    <span className="card-title teal-text text-darken-1">{props.project.client}</span>
                    <p><strong>{props.project.name}</strong></p>
                    <p>Amplifiers: {amplifiers}</p>
                    <p>Live Date: {moment(props.project.project_live).format('DD/MM/YYYY')}</p>
                </div>
                <div className="card-action grey lighten-5">
                    <Link to={'/projects/project/' + props.project._id}>More Info...</Link>
                </div>
            </div>
        </div>
    );
};

const ProjectResults = (props) => {
    let results = props.projects.map((item, index) => {
        return (
            <ProjectResult
                key={index}
                project={item}
            />
        );
    });
    return (
        <div className="">
            <div className="row">
                {results}
            </div>
        </div>
    );
};

export default ProjectResults;