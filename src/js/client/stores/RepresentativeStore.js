import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class RepresentativeStore extends BaseStore {

    constructor() {
        super();
        this.representatives = null;
        this.representative = null;
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_REPRESENTATIVES:
                this.representatives = action.representatives;
                this.emitChange();
                break;
            case AppConstants.FIND_REPRESENTATIVE:
                this.representative = action.representative;
                this.emitChange();
                break;
        }
    }

    getRepresentatives() {
        return this.representatives;
    }
    getCurrentRepresentative() {
        return this.representative;
    }
}

export default new RepresentativeStore();