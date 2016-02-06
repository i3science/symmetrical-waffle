import React from 'react'; // eslint-disable-line no-unused-vars
import ProjectCheckpoint from './projectCheckpoint';







const ProjectDates = (props) => {

    console.log(props.checkpoints_start);

    return (
        <div className="row project-dates">
            <div className="col s4">
                <ProjectCheckpoint
                    id="project_start"
                    label="Project Start:"
                    val={props.project.project_start || '123456'}
                    onChange={props.onChange}
                />

                <ProjectCheckpoint
                    id="checkpoint_1"
                    label="Checkpoint #1:"
                    val={props.project.checkpoint1 || '987654321'}
                    onChange={props.onChange}
                />
            </div>
            <div className="col s4">
                <ProjectCheckpoint
                    id="project_live"
                    label="Project Live:"
                    val={props.project.project_live}
                    onChange={props.onChange}
                />
            </div>
            <div className="col s4">
                <ProjectCheckpoint
                    id="project_end"
                    label="Project End:"
                    val={props.project.project_end}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default ProjectDates;
