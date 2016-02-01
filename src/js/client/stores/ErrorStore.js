import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class ErrorStore extends BaseStore {

    constructor() {
        super();
        this.errors = {};
        this.setMaxListeners(0);
    }

    _listener(action) {
        if (!action) {
            return;
        }

        if (action.actionType === AppConstants.RECEIVED_ERRORS) {
            this.errors = action.errors;
            this.emitChange();
        }
    }

    getErrors() {
        return this.errors;
    }
    getFieldError(field) {
        return this.errors[field] || null;
    }
}

export default new ErrorStore();