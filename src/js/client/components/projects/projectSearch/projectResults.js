import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import moment from 'moment';

const ProjectResult = (props) => {
    let type = '';
    switch (props.project.projectType) {
        case 'blogger':
            type = 'Bloggers';
            break;
        case 'vlogger':
            type = 'Vloggers';
            break;
        case 'photo_blogger':
            type = 'Photo bloggers';
            break;
        case 'amplifier':
            type = 'Amplifiers';
            break;
    }
    return (
        <div className="col m3 s2">
            <div className="card">
                <div className="card-content">
                    <span className="card-title teal-text text-darken-1">{props.project.client.name}</span>
                    <p><strong>{props.project.name}</strong></p>

                    <p>{type}: {props.project.required_influencers[props.project.projectType + 's']}</p>
                    <p>Live Date: {moment(props.project.project_live).format('DD/MM/YYYY')}</p>
                </div>
                <div className="card-action grey lighten-5">
                    <Link to={'/projects/' + props.project._id}>More Info...</Link>
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