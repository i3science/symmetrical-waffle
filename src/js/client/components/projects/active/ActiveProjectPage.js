import React from 'react';

import ProjectAssets from './ProjectAssets';

import ProjectParams from './../common/ProjectParams';
import CampaignElements from './../common/CampaignElements';

import Card from '../../common/Card';
import History from '../../common/History';

const ProjectCalendar = () => {
    return (<Card><p>Loading calendar...</p></Card>);
};

class ActiveProjectPage extends React.Component {
    constructor() {
        super();
        this.state = {
            checkpoints: {}
        };
        this._handleChange = this._handleChange.bind(this);
        this._addCheckpoint = this._addCheckpoint.bind(this);
        this._newDate = this._newDate.bind(this);
    }

    _handleChange(event) {
        let value = event.target.value;
        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        if (!event.target.dataset.parent) {
            this.props.project[event.target.id] = value;
        } else {
            this.props.project[event.target.dataset.parent][event.target.id] = value;
        }
        this.setState({project: this.props.project});
    }

    _addCheckpoint(checkpoint, parent, event) {
        event.preventDefault();
        $('#' + parent + '_container').hide();
        $('#add-check, #add-check i').show();
        this.props.project[parent].push(checkpoint);
        this.setState({
            project: this.props.project,
            checkpoints: {}
        });
    }
    _newDate(event) {
        this.state.checkpoints[event.target.id] = event.target.value;
        this.setState({checkpoints: this.state.checkpoints});
    }

    render() {
        return (
            <div>
                <ProjectParams
                    project={this.props.project}
                    onChange={this._handleChange}
                    addCheckpoint={this._addCheckpoint}
                    newDate={this._newDate}
                    newCheckpoints={this.state.checkpoints} />

                <Card title="Recent Activities">
                    <History type="projects" id={this.props.project._id} children />
                </Card>

                <ProjectCalendar
                    project={this.props.project} />

                <CampaignElements
                    project={this.props.project} />

                <ProjectAssets
                    project={this.props.project} />

            </div>
        );
    }
}

export default ActiveProjectPage;