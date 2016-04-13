import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class UserStore extends BaseStore {

    constructor() {
        super();
        this.current_user = null;
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.GET_CURRENT_USER:
                this.current_user = action.user;
                this.emitChange();
        }
    }

    getCurrentUser() {
        return this.current_user;
    }
}

export default new UserStore();