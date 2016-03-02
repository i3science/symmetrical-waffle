import React from 'react';
import moment from 'moment';
import TaskActions from '../../actions/TaskActions';
import ProjectActions from '../../actions/ProjectActions';
import CampaignElementActions from '../../actions/CampaignElementActions';
import taskStore from '../../stores/TaskStore';
import projectStore from '../../stores/ProjectStore';
import campaignElementStore from '../../stores/CampaignElementStore';
import CheckBox from '../common/input/checkbox';
import InputDate from '../common/input/inputdate';
import InputText from '../common/input/inputtext';

export default class Tasks extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: null,
            project: null
        };
        this._onStoreChange = this._onStoreChange.bind(this);
        this._onAddTask = this._onAddTask.bind(this);
        this._onCheckTask = this._onCheckTask.bind(this);
    }
    componentWillMount() {
        campaignElementStore.addChangeListener(this._onStoreChange);
        projectStore.addChangeListener(this._onStoreChange);
        taskStore.addChangeListener(this._onStoreChange);
        ProjectActions.refreshProjects();
    }
    componentDidMount() {
        TaskActions.findForElement(this.props.project, this.props.element._id);
        CampaignElementActions.listAssignees(this.props.project, this.props.element._id);
    }
    componentWillUnmount() {
        campaignElementStore.removeChangeListener(this._onStoreChange);
        projectStore.removeChangeListener(this._onStoreChange);
        taskStore.removeChangeListener(this._onStoreChange);
    }
    _onStoreChange() {
        this.setState({
            tasks: taskStore.getTasks(),
            assignees: campaignElementStore.getAssignees(),
            project: projectStore.getProjectById(this.props.project)
        });
    }

    _onCheckTask(task) {
        return (ev) => {
            task.done = ev.target.checked;
            this.setState({});
            TaskActions.save(this.props.project, this.props.element._id, task);
        };
    }

    _onAddTask(ev) {
        ev.preventDefault();
        let data = {
            name: ev.target[0].value,
            assignee: ev.target[1].value,
            due: ev.target[2].value
        };
        TaskActions
            .save(this.props.project, this.props.element._id, data)
            .then(() => {
                this.setState({ adding:false });
            })
            .fail(() => {});
    }


    renderAdder() {
        if (!this.state.adding) {
            return (
                <div className="right-align">
                    <button
                        type="submit"
                        className="btn-flat blue-grey lighten-2 white-text"
                        onClick={(e) => {e.preventDefault();this.setState({ adding:true });}}
                        style={{padding: '0 15px', fontSize: '12px'}}>
                        <i className="material-icons right">add</i>Add a Task
                    </button>
                </div>
            );
        }
        return (
            <form onSubmit={this._onAddTask}>
                <div className="row">
                    <div className="col s6">
                        <InputText
                            id="task_text"
                            label="Task"
                            active
                        />
                    </div>
                    <div className="col s3">
                        <div className="input-field" style={{borderBottom: ' 1px solid #9e9e9e'}}>
                            <select
                                id="task_assignee"
                                name="task_assignee"
                                className="browser-default"
                                style={{display: 'block', height: '3rem'}}>
                                {this.state.assignees.map((assignee) => {
                                    return (<option value={assignee._id} key={assignee._id}>{assignee.name.first} {assignee.name.last}</option>);
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col s3">
                        <div className="input-field">
                            <InputDate
                                id="task_due"
                                placeholder="Due Date"
                                active
                            />
                        </div>
                    </div>
                </div>
                <div className="col s12 right-align">
                    <button
                        className="btn-flat tiny white green-text"
                        type="submit"
                        style={{marginRight: '40px'}}>
                        <i className="material-icons right">save</i>
                        Save
                    </button>
                    <button
                        className="btn-flat tiny white red-text"
                        type="button"
                        onClick={(e) => {e.preventDefault();this.setState({adding:false});}}>
                        <i className="material-icons right">clear</i>
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.assignees ? true : false;
    }


    render() {
        if (!this.props.project
                || !this.props.element
                || typeof this.state.tasks === 'undefined'
                || this.state.tasks === null) {
            return (
                <div>
                    <p>Loading tasks...</p>
                </div>
            );
        }
        let tasks =  this.state.tasks.map((task) => {
            return (
                <div key={task._id} className="row" style={{padding: '10px 0px', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
                    <div className="col s3">
                        <div className="chip">
                            <img src={'/assets/images/' + (task.assignee.hasImage ? task.assignee._id : 'default') +'.jpg'} />
                            {task.assignee.name.first} {task.assignee.name.last}
                        </div>
                        <p style={{margin: '5px 0', fontSize: '12px'}}>
                            <span className="teal-text"><strong>Due: </strong></span> {moment(task.due).format('MMM. DD/YY')}
                        </p>
                    </div>
                    <div className="col s9">
                        <CheckBox
                            id={task._id}
                            style={{marginTop: '0'}}
                            label={task.name}
                            checked={task.done}
                            onChange={this._onCheckTask(task)}
                        />
                    </div>
                </div>
            );
        });
        return (
            <div>
                <div className="center-align">
                    <h3>{this.props.element.name}</h3>
                    <h5>{this.state.project.name}</h5>
                </div>
                {(this.props.tasks || []).length !== 0 ?
                <h5 className="grey-text text-darken-2">Tasks & Deadlines</h5>
                    : null }
                {tasks}
                {this.renderAdder()}
            </div>
        );
    }
}