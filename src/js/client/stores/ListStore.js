import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class ListStore extends BaseStore {

    constructor() {
        super();
        this.lists = [];
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_LISTS:
                this.lists = action.lists;
                this.emitChange();
        }
    }

    getLists() {
        return this.lists;
    }
}

export default new ListStore();