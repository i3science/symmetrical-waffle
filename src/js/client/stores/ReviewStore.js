import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class ReviewStore extends BaseStore {

    constructor() {
        super();
        this.reviews = null;
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_REVIEWS:
                this.reviews = action.reviews;
                this.emitChange();
        }
    }

    getReviews() {
        return this.reviews;
    }
}

export default new ReviewStore();