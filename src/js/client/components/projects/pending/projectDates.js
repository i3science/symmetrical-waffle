import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import InputText from '../../common/input/inputtext';
import ProjectCheckpoint from '../common/ProjectCheckpoint';
import moment from 'moment';

const ProjectCheckpoints = (props) => {
    if (!props.checkpoints) {
        return <div></div>;
    }
    let projectCheckpoints = props.checkpoints.map((item, index) => {
        return (
            <ProjectCheckpoint
                key={index}
                id={'checkpoints_' + props.phase + '_' + index}
                label={item.name}
                parent={'checkpoints_' + props.phase}
                val={moment(item.date).format('DD/MM/YYYY') || null}
                onChange={props.onChange}
            />
        );
    });
    let newDate = (phase, event) => {
        event.preventDefault();
        $('#checkpoints_' + phase + '_container').show();
        event.target.style.display = 'none';
    };

    return (
        <div>
            {projectCheckpoints}
            <div id={'checkpoints_' + props.phase + '_container'} className="row" style={{display: 'none'}}>
                <div style={{marginTop: '15px'}}>
                    <InputText
                        id={'checkpoints_' + props.phase + '_newname'}
                        label={'New '+ props.phase.capitalize() +' Task'}
                        col="s6"
                        val={props.newCheckpoints['checkpoints_' + props.phase + '_newname'] || null}
                        active={true}
                        onChange={props.newDate}
                    />
                    <InputText
                        id={'checkpoints_' + props.phase + '_newdate'}
                        label="Date"
                        col="s6"
                        val={props.newCheckpoints['checkpoints_' + props.phase + '_newdate'] || null}
                        active={true}
                        onChange={props.newDate}
                    />
                </div>
                <div className="col s12">
                    <Link
                        to=""
                        className="blue-grey white-text lighten-2 btn-flat right"
                        onClick={props.addCheckpoint.bind(this, {
                        name: props.newCheckpoints['checkpoints_' + props.phase + '_newname'],
                        date: props.newCheckpoints['checkpoints_' + props.phase + '_newdate']}, 'checkpoints_' + props.phase)
                        }>Save</Link>
                </div>
            </div>
            <div className="col s12">
                <Link to="" id="add-check" onClick={newDate.bind(this, props.phase)} className="teal-text right"><i className="material-icons">add</i></Link>
            </div>
        </div>
    );
};

const ProjectDates = (props) => {
    return (
        <div className="row project-dates">
            <div className="col s4">
                <div style={{width: '300px', margin: '0 auto'}}>
                    <ProjectCheckpoint
                        id="project_start"
                        label="Project Start:"
                        val={props.project.project_start || '123456'}
                        onChange={props.onChange}
                    />
                    <ProjectCheckpoints
                        checkpoints={props.project.checkpoints_start || null}
                        phase="start"
                        onChange={props.onChange}
                        addCheckpoint={props.addCheckpoint}
                        newDate={props.newDate}
                        newCheckpoints={props.newCheckpoints}
                    />
                </div>
            </div>
            <div className="col s4">
                <div style={{width: '300px', margin: '0 auto'}}>
                    <ProjectCheckpoint
                        id="project_live"
                        label="Project Live:"
                        val={props.project.project_live}
                        onChange={props.onChange}
                    />
                    <ProjectCheckpoints
                        checkpoints={props.project.checkpoints_live || null}
                        phase="live"
                        onChange={props.onChange}
                        addCheckpoint={props.addCheckpoint}
                        newDate={props.newDate}
                        newCheckpoints={props.newCheckpoints}
                    />
                </div>
            </div>
            <div className="col s4">
                <div style={{width: '300px', margin: '0 auto'}}>
                    <ProjectCheckpoint
                        id="project_end"
                        label="Project End:"
                        val={props.project.project_end}
                        onChange={props.onChange}
                    />
                    <ProjectCheckpoints
                        checkpoints={props.project.checkpoints_end || null}
                        phase="end"
                        onChange={props.onChange}
                        addCheckpoint={props.addCheckpoint}
                        newDate={props.newDate}
                        newCheckpoints={props.newCheckpoints}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectDates;
