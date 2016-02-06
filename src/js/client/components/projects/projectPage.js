import React from 'react';
import projectStore from '../../stores/ProjectStore';
import Project from './project';

class ProjectPage extends React.Component {
    constructor() {
        super();
        this.state = {
            project: {}
        };
        this._handleChange = this._handleChange.bind(this);
    }
    componentWillMount() {
        this.state.project = projectStore.getProjectById(this.props.params.id);
        this.setState({project: this.state.project});
    }
    _handleChange(event) {
        console.log(event.target);
        let value = event.target.value;
        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        if (!event.target.dataset.parent) {
            this.state.project[event.target.id] = value;
        } else {
            this.state.project[event.target.dataset.parent][event.target.id] = value;
        }
        this.setState({project: this.state.project});
        console.log(this.state.project);
    }
    render() {
        return (
            <Project
                project={this.state.project}
                onChange={this._handleChange}
            />
        );
    }
}

export default ProjectPage;