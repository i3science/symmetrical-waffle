import React from 'react';
import moment from 'moment';
import TaskActions from '../../actions/TaskActions';
import CampaignElementActions from '../../actions/CampaignElementActions';
import taskStore from '../../stores/TaskStore';
import campaignElementStore from '../../stores/CampaignElementStore';
import Card from '../common/Card';
import CheckBox from '../common/input/checkbox';
import InputDate from '../common/input/inputdate';
import InputText from '../common/input/inputtext';
import { Link } from 'react-router';

export default class Tasks extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: null
        };
        this._onStoreChange = this._onStoreChange.bind(this);
        this._onAddTask = this._onAddTask.bind(this);
        this._onCheckTask = this._onCheckTask.bind(this);
    }

    componentWillMount() {
        taskStore.addChangeListener(this._onStoreChange);
        campaignElementStore.addChangeListener(this._onStoreChange);
        TaskActions.findForElement(this.props.project, this.props.element._id);
        CampaignElementActions.listAssignees(this.props.project, this.props.element._id);
    }
    componentWillUnmount() {
        taskStore.removeChangeListener(this._onElementChange);
    }
    _onStoreChange() {
        this.setState({
            tasks: taskStore.getTasks(),
            assignees: campaignElementStore.getAssignees()
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
            .catch(() => {});
    }


    renderAdder() {
        if (!this.state.adding) {
            return (
                <Link to="" onClick={(e) => {e.preventDefault();this.setState({ adding:true });}} className="green-text">
                    <div className="btn-flat tiny white teal-text" style={{padding: '0', fontSize: '12px'}}>
                        <i className="material-icons right">add</i>Add a Task
                    </div>
                </Link>
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
                        <i className="material-icons right">done</i>
                        Save
                    </button>
                    <button
                        className="btn-flat tiny white red-text"
                        type="button"
                        onClick={(e) => {e.preventDefault();this.setState({ adding:false });}}>
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
                <Card>
                    <p>Loading tasks...</p>
                </Card>
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
            <Card title="Tasks & Deadlines">
                {tasks}
                {this.renderAdder()}
            </Card>
        );
    }
}