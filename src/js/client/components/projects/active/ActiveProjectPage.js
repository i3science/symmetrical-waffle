import React from 'react';
import { Link } from 'react-router';
import historyStore from '../../../stores/HistoryStore';
import HistoryActions from '../../../actions/HistoryActions';
import ProjectAssets from './../common/ProjectAssets';
import ProjectParams from './../common/ProjectParams';
import ProjectCalendar from './../common/ProjectCalendar';
import CampaignElements from './../common/CampaignElements';
import Card from '../../common/Card';
import History from '../../common/History';
import Actions from '../../../actions/UiActions';

class ActiveProjectPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            project: props.project
        };
        this._removeCheckmark = this._removeCheckmark.bind(this);
        this._onHistoryChange = this._onHistoryChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleDate = this._handleDate.bind(this);
        this._onSave = this._onSave.bind(this);
        this._cancel = this._cancel.bind(this);
    }
    componentWillMount() {
        historyStore.addChangeListener(this._onHistoryChange);
        HistoryActions.findForEntity('projects', this.props.project._id, true);
    }
    componentWillUnmount() {
        historyStore.removeChangeListener(this._onHistoryChange);
    }
    _onHistoryChange() {
        this.setState({ history: historyStore.getHistory() });
    }

    componentDidMount() {
        Actions.getProjectDates(this.props.project, (dates) => {
            this.setState({ dates: dates });
        });
    }

    _handleChange(event) {
        let value = event.target.value;
        let id = event.target.id;

        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        if (event.target.type === 'radio') {
            id = event.target.name;
            value = event.target.id;
        }
        if (!event.target.dataset.parent) {
            this.state.project[id] = value;
        } else {
            this.state.project[event.target.dataset.parent][id] = value;
        }
        this.setState({project: this.state.project});
    }

    _handleDate(date, name, parent) {
        if (parent) {
            this.state.project[parent].push({name: name, date: date});
        } else {
            this.state.project[name] = date;
        }
        this.setState({project: this.state.project});
        Actions.updateProject(this.state.project);
    }
    _removeCheckmark(index, phase) {
        this.state.project['checkpoints_' + phase].splice(index, 1);
        this.setState({project: this.state.project});
        Actions.updateProject(this.state.project);
    }
    _onSave(event) {
        event.preventDefault();
        Actions.updateProject(this.state.project);
    }
    _cancel(event) {
        event.preventDefault();
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <Card title={this.props.project.name} deep>
                    <ProjectParams
                        project={this.props.project}
                        onChange={this._handleChange}
                        handleDate={this._handleDate}
                        removeCheckmark={this._removeCheckmark}
                    />
                    <hr />
                    <div className="col 12" style={{float: 'none'}}>
                        <Link to="" className="blue-grey lighten-5 waves-effect waves-light btn-large btn-flat" onClick={this._cancel}>Cancel</Link>
                        <Link to="" className="teal waves-effect waves-light btn-large right" onClick={this._onSave}>Save Changes</Link>
                    </div>
                </Card>
                <Card title="Recent Activities">
                    <History
                        type="projects"
                        id={this.props.project._id}
                        children
                    />
                </Card>
                <Card title="Dates">
                    <ProjectCalendar
                        project={this.props.project}
                        events={this.state.dates} />
                </Card>
                <Card title="Campaign Elements">
                    <CampaignElements
                        project={this.props.project} />
                </Card>
                <Card title="Digital Assets">
                    <ProjectAssets project={this.props.project} />
                </Card>

            </div>
        );
    }
}

export default ActiveProjectPage;