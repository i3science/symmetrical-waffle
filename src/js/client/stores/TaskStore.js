import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class TaskStore extends BaseStore {

    constructor() {
        super();
        this.tasks = null;
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_TASKS:
                this.tasks = action.tasks;
                this.emitChange();
        }
    }

    getTasks() {
        return this.tasks;
    }
}

export default new TaskStore();