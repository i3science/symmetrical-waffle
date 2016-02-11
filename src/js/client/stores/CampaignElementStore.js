import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class CampaignElementStore extends BaseStore {

    constructor() {
        super();
        this.elements = null;
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_ELEMENTS:
                this.elements = action.elements;
                this.emitChange();
        }
    }

    getElements() {
        return this.elements;
    }
}

export default new CampaignElementStore();