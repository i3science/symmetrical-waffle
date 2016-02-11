import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Actions from '../../actions/UiActions';
import TaskActions from '../../actions/TaskActions';
import CampaignElementActions from '../../actions/CampaignElementActions';
import taskStore from '../../stores/TaskStore';
import campaignElementStore from '../../stores/CampaignElementStore';
import Card from '../common/Card';
import Checkbox from '../common/input/checkbox';

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
        }
    }

    _onAddTask(ev) {
        ev.preventDefault();
        let data = {
            name: ev.target[0].value,
            assignee: ev.target[1].value,
            due: ev.target[2].value
        };
        TaskActions.save(this.props.project, this.props.element._id, data);
    }

    renderTasks() {
        return this.state.tasks.map((task) => {
            return (
                <div key={task._id}>
                    <input
                        type="checkbox"
                        id={task._id}
                        name={task._id}
                        checked={task.done}
                        className="filled-in"
                        onChange={this._onCheckTask(task)} />
                    <label htmlFor={task._id}>
                        {task.name}

                        <div className="chip">
                            <img src=""/>
                            {task.assignee.name.first} {task.assignee.name.last}
                        </div>
                        <div className="chip">
                            {moment(task.due).format('MMM. DD/YY @ h:mma')}
                        </div>
                    </label>
                </div>
            )
        });
    }

    renderAdder() {
        if (!this.state.adding) {
            return null;
        }
        return (
            <div className="row">
                <form onSubmit={this._onAddTask}>
                    <div className="col s7">
                        <input
                            type="text"
                            id="task_text"
                            name="task_text" />
                    </div>
                    <div className="col s2">
                        <select
                            id="task_assignee"
                            name="task_assignee"
                            style={{display: 'block'}}>
                            {
                                this.state.assignees.map((assignee) => {
                                    return (<option value={assignee._id} key={assignee._id}>{assignee.name.first} {assignee.name.last}</option>);
                                })
                            }
                        </select>
                    </div>
                    <div className="col s2">
                        <input
                            type="date"
                            id="task_due"
                            name="task_due" />
                    </div>
                    <div className="col s1">
                        <input type="button" value="Cancel" onClick={() => {this.setState({ adding:false })}}/>
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
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
        return (
            <Card title="Tasks & Deadlines">
                {this.renderTasks()}
                {this.renderAdder()}
                <span onClick={() => {this.setState({ adding:true })}}>+ Add Another Task</span>
            </Card>
        );
    }
}