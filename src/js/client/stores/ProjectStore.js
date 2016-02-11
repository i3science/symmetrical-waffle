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
            case AppConstants.SET_CURRENT_PROJECT:
                this.currentProjectId = action.id;
                this.emitChange();
                break;
            case AppConstants.UPDATE_PROJECT:
                if (_.find(this.projects, {_id: action.project._id})) {
                    console.log(this.projects);
                    _.remove(this.projects, {_id: action.project._id});
                    this.projects.push(action.project);
                    console.log(this.projects);
                }
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
        return this.currentProjectId;
    }
}

export default new ProjectStore();