import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class CommentStore extends BaseStore {

    constructor() {
        super();
        this.comments = null;
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_COMMENTS:
                this.comments = action.comments;
                this.emitChange();
        }
    }

    getComments() {
        return this.comments;
    }
}

export default new CommentStore();