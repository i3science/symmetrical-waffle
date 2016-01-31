import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';
import _ from 'lodash';

class ProjectStore extends BaseStore {

    constructor() {
        super();
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
}

export default new ProjectStore();