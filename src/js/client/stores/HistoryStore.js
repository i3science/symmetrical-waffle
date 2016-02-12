import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class HistoryStore extends BaseStore {

    constructor() {
        super();
        this.history;
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.GET_HISTORY:
                this.history = action.history;
                this.emitChange();
        }
    }

    getHistory() {
        return this.history;
    }
}

export default new HistoryStore();