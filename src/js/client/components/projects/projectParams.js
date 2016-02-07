import React from 'react'; // eslint-disable-line no-unused-vars
import ProjectDates from './projectDates';
import InputTextArea from '../elements/inputtextarea';
import CheckBox from '../elements/checkbox';
import InputText from '../elements/inputtext';

const Project = (props) => {
    console.log(props.project);
    return (
        <div className="card-panel z-depth-4">
            <h5 className="grey-text text-darken-2" style={{marginBottom: '30px'}}>{props.project.name}</h5>
            <div className="row">
                <div className="col s6 separate-right">
                    <InputText
                        id="client"
                        label="Client Name"
                        val={props.project.client}
                        active={true}
                        onChange={props.onChange}
                    />
                    <InputText
                        id="name"
                        label="Project Name"
                        val={props.project.name}
                        active={true}
                        onChange={props.onChange}
                    />
                    <InputText
                        id="advertiser"
                        label="Advertiser Name"
                        val="NEED ADVERTISER NAME"
                        active={true}
                        onChange={props.onChange}
                    />
                    <InputTextArea
                        id="brief"
                        label="Project Brief"
                        val={props.project.brief}
                        active={true}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s6">
                    <div className="col s12">
                        <h6>Project Goals</h6>
                        <div className="row">
                            <div className="col s4">
                                <CheckBox
                                    id="engagement"
                                    label="Engagement"
                                    parent="goals"
                                    onChange={props.onChange}
                                    checked={props.project.goals.engagement}
                                />
                            </div>
                            <div className="col s4">
                                <CheckBox
                                    id="reach"
                                    label="Reach"
                                    parent="goals"
                                    onChange={props.onChange}
                                    checked={props.project.goals.reach}
                                />
                            </div>
                            <div className="col s4">
                                <CheckBox
                                    id="general"
                                    label="General"
                                    parent="goals"
                                    onChange={props.onChange}
                                    checked={props.project.goals.general}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col s8">
                        <h6>Number of Influencers</h6>
                        <div className="row">
                            <InputText
                                type="number"
                                id="bloggers"
                                col="s6"
                                width="50px"
                                suffix="Bloggers"
                                val={props.project.required_influencers.bloggers}
                                parent="required_influencers"
                                active={true}
                                onChange={props.onChange}
                            />
                            <InputText
                                type="number"
                                id="vloggers"
                                col="s6"
                                width="50px"
                                suffix="Vloggers"
                                val={props.project.required_influencers.vloggers}
                                parent="required_influencers"
                                active={true}
                                onChange={props.onChange}
                            />
                            <InputText
                                type="number"
                                id="photo_bloggers"
                                col="s6"
                                width="50px"
                                suffix="Photo Bloggers"
                                val={props.project.required_influencers.photo_bloggers}
                                parent="required_influencers"
                                active={true}
                                onChange={props.onChange}
                            />
                            <InputText
                                type="number"
                                id="amplifiers"
                                col="s6"
                                width="50px"
                                suffix="Amplifiers"
                                val={props.project.required_influencers.amplifiers}
                                parent="required_influencers"
                                active={true}
                                onChange={props.onChange}
                            />
                        </div>
                    </div>
                    <div className="col s4 center-align">
                        <h6>Total Influencers</h6>
                        <h4>{props.project.required_influencers.bloggers +
                        props.project.required_influencers.vloggers +
                        props.project.required_influencers.photo_bloggers +
                        props.project.required_influencers.amplifiers}
                        </h4>
                    </div>
                    <div className="col s12">
                        <InputText
                            id="required_impressions"
                            label="Total Impressions"
                            col="s4"
                            val={props.project.required_impressions}
                            active={true}
                            onChange={props.onChange}
                        />
                        <InputText
                            id="budget"
                            label="Budget"
                            col="s4"
                            val={props.project.budget}
                            active={true}
                            onChange={props.onChange}
                        />
                    </div>
                </div>
            </div>
            <h6>Project Dates</h6>
            <br />
            <ProjectDates
                {...props}
            />
        </div>
    );
};

export default Project;