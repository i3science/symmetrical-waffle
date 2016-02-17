import React from 'react'; // eslint-disable-line no-unused-vars
import ProjectDates from './ProjectDates';
import ProjectType from './ProjectType';
import InputTextArea from '../../common/input/inputtextarea';
import CheckBox from '../../common/input/checkbox';
import InputText from '../../common/input/inputtext';

export default (props) => {
    return (
        <div>
            <div className="row">
                <div className="col s6 separate-right">
                    <InputText
                        id="client"
                        label="Client Name"
                        val={props.project.client.name}
                        active
                        onChange={props.onChange}
                    />
                    <InputText
                        id="name"
                        label="Project Name"
                        val={props.project.name}
                        active
                        onChange={props.onChange}
                    />
                    <InputText
                        id="advertiser"
                        label="Advertiser Name"
                        val="NEED ADVERTISER NAME"
                        active
                        onChange={props.onChange}
                    />
                    <InputTextArea
                        id="brief"
                        label="Project Brief"
                        val={props.project.brief}
                        active
                        onChange={props.onChange}
                    />
                </div>
                <div className="col s6">
                    <div className="row">
                        <div className="col s6">
                            <h6>Project Type</h6>
                            <ProjectType
                                val={props.project.projectType || 'blogger'}
                                onChange={props.onChange}
                            />
                        </div>
                        <div className="col s6">
                            <div className="center-align" style={{
                                padding: '30px',
                                border: '1px solid rgba(0,0,0,0.1)'
                            }}>
                                <h6>Number of Influencers</h6>
                                {props.project.projectType === 'blogger' ?
                                    <InputText
                                        type="number"
                                        id="bloggers"
                                        style={{width: '50px', fontSize: '20px', textAlign: 'center'}}
                                        suffix="Bloggers"
                                        val={props.project.required_influencers.bloggers}
                                        parent="required_influencers"
                                        active
                                        onChange={props.onChange}
                                    /> : null}
                                {props.project.projectType === 'vloggers' ?
                                    <InputText
                                        type="number"
                                        id="vloggers"
                                        style={{width: '50px', fontSize: '20px', textAlign: 'center'}}
                                        suffix="Vloggers"
                                        val={props.project.required_influencers.vloggers}
                                        parent="required_influencers"
                                        active
                                        onChange={props.onChange}
                                    /> : null}
                                {props.project.projectType === 'photo_bloggers' ?
                                    <InputText
                                        type="number"
                                        id="photo_bloggers"
                                        style={{width: '50px', fontSize: '20px', textAlign: 'center'}}
                                        suffix="Photo Bloggers"
                                        val={props.project.required_influencers.photo_bloggers}
                                        parent="required_influencers"
                                        active
                                        onChange={props.onChange}
                                    /> : null}
                                {props.project.projectType === 'amplifier' ?
                                    <InputText
                                        type="number"
                                        id="amplifiers"
                                        style={{width: '50px', fontSize: '20px', textAlign: 'center'}}
                                        suffix="Amplifiers"
                                        val={props.project.required_influencers.amplifiers}
                                        parent="required_influencers"
                                        active
                                        onChange={props.onChange}
                                    /> : null}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <h6>Project Goals</h6>
                            <CheckBox
                                id="engagement"
                                label="Engagement"
                                parent="goals"
                                onChange={props.onChange}
                                checked={props.project.goals.engagement}
                            />
                            <CheckBox
                                id="reach"
                                label="Reach"
                                parent="goals"
                                onChange={props.onChange}
                                checked={props.project.goals.reach}
                            />
                            <CheckBox
                                id="general"
                                label="General"
                                parent="goals"
                                onChange={props.onChange}
                                checked={props.project.goals.general}
                            />
                        </div>
                        <div className="col s6">
                            <InputText
                                id="required_impressions"
                                label="Total Impressions"
                                val={props.project.required_impressions}
                                active
                                onChange={props.onChange}
                            />
                            <InputText
                                id="budget"
                                label="Budget"
                                val={props.project.budget}
                                active
                                onChange={props.onChange}
                            />
                        </div>
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