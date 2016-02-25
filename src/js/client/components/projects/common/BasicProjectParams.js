import React from 'react'; // eslint-disable-line no-unused-vars
import InputTextArea from '../../common/input/inputtextarea';
import InputText from '../../common/input/inputtext';
import ClientDropdown from '../../common/input/stateful/ClientDropdown';
import ProjectStatusDate from './ProjectStatusDate';

export default (props) => {
    return (
        <div>
            <div className="row">
                <div className="col s6 separate-right">
                    <InputText
                        id="name"
                        label="Project Name"
                        val={props.project.name}
                        active
                        readOnly={true}
                        disabled={true}
                        onChange={() => {}} />
                    <ClientDropdown
                        id="client"
                        label="Client Name"
                        val={(props.project.client._id || props.project.client) + ''}
                        active
                        readOnly={true}
                        disabled={true}
                        onChange={() => {}} />
                    <InputTextArea
                        id="brief"
                        label="Project Brief"
                        val={props.project.brief}
                        active
                        readOnly={true}
                        disabled={true}
                        onChange={() => {}} />
                </div>
                <div className="col s6">
                    <div className="row">
                        <div className="col s6">
                            <h6>Milestones</h6>

                            <ProjectStatusDate
                                id="project_start"
                                label="Project Start:"
                                val={props.project.project_start}
                                onChange={() => {}}
                                readOnly={true}
                                disabled={true} />
                            <ProjectStatusDate
                                id="project_live"
                                label="Project Live:"
                                val={props.project.project_live}
                                onChange={() => {}}
                                readOnly={true}
                                disabled={true} />
                            <ProjectStatusDate
                                id="project_end"
                                label="Project End:"
                                val={props.project.project_end}
                                onChange={() => {}}
                                readOnly={true}
                                disabled={true} />

                            <h6>Compensation</h6>

                            <InputText
                                id="compensation"
                                val={'$2,000 for 1 blog post'}
                                readOnly={true}
                                disabled={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};