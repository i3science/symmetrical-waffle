import React from 'react';
import projectActions from '../../actions/ProjectActions';
import projectStore from '../../stores/ProjectStore';

import PendingProjectPage from './pending/PendingProjectPage';
import ActiveProjectPage from './active/ActiveProjectPage';

export default class ProjectPage extends React.Component {
    constructor() {
        super();
        this.state = {
            project: null
        };
        this._onProjectChange = this._onProjectChange.bind(this);
    }
    componentWillMount() {
        projectStore.addChangeListener(this._onProjectChange);
        projectActions.findById(this.props.params.id);
    }
    componentWillUnmount() {
        projectStore.removeChangeListener(this._onProjectChange);
    }
    _onProjectChange() {
        this.setState({ project: projectStore.getCurrentProject() });
    }

    render() {
        if (!this.state.project) {
            return (<p>Loading project...</p>);
        }

        if (!this.state.project.approved) {
            return (<PendingProjectPage project={this.state.project} history={this.props.history} />);
        }
        return (<ActiveProjectPage project={this.state.project} history={this.props.history} />);
    }
}