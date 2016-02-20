import React from 'react';
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
        this._handleChange = this._handleChange.bind(this);
        this._handleDate = this._handleDate.bind(this);
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

    _handleDate(name, date, parent){
        this.state.project[parent].push({name: name, date: date});
        this.setState({project: this.state.project});
        Actions.updateProject(this.state.project);
    }

    render() {
        return (
            <div>
                <Card title={this.props.project.name} deep>
                    <ProjectParams
                        project={this.props.project}
                        onChange={this._handleChange}
                        handleDate={this._handleDate}
                    />
                </Card>
                <Card title="Recent Activities">
                    <History type="projects" id={this.props.project._id} children />
                </Card>
                <Card title="Dates">
                    <ProjectCalendar project={this.props.project} />
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