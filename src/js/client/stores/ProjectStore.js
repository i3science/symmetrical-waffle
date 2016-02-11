import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';
import _ from 'lodash';

class ProjectStore extends BaseStore {

    constructor() {
        super();
        this.currentProjectId = null;
        this.projects = [];
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_PROJECTS:
                this.projects = action.projects;
                this.emitChange();
                break;
            case AppConstants.UPDATE_PROJECT:
                if (_.find(this.projects, {_id: action.project._id})) {
                    _.remove(this.projects, {_id: action.project._id});
                    this.projects.push(action.project);
                }
                this.emitChange();
                break;
            case AppConstants.GET_PROJECT:
                this.currentProject = action.project;
                this.emitChange();
                break;
        }
    }

    getProjects() {
        return this.projects;
    }
    getProjectById(id) {
        // TODO If the influencer doesn't exist, attempt to get it from the
        // server
        return _.find(this.projects, { _id: id });
    }
    getCurrentProject() {
        return this.currentProject;
    }
}

export default new ProjectStore();