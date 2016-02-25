import React from 'react';
import projectActions from '../../actions/ProjectActions';
import projectStore from '../../stores/ProjectStore';
import authenticationStore from '../../stores/AuthenticationStore';

import InfluencerElementPage from '../elements/InfluencerElementPage';
import PendingProjectPage from './pending/PendingProjectPage';
import ActiveProjectPage from './active/ActiveProjectPage';
import InfluencerProjectPage from './pending/InfluencerProjectPage';

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

        let user = authenticationStore.getCurrentUser();
        if (user.roles && user.roles.indexOf('influencer') > -1) {
            if (this.state.project.approved) {
                // Show element
                return (<InfluencerElementPage project={this.state.project} />);
            } else {
                // Show description
                return (<InfluencerProjectPage project={this.state.project} />);
            }
        }

        if (!this.state.project.approved) {
            return (<PendingProjectPage project={this.state.project} history={this.props.history} />);
        }
        return (<ActiveProjectPage project={this.state.project} history={this.props.history} />);
    }
}