import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class CampaignElementStore extends BaseStore {

    constructor() {
        super();
        this.elements = null;
        this.element = null;
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_ELEMENTS:
                this.elements = action.elements;
                this.emitChange();
                break;
            case AppConstants.GET_ELEMENT:
                this.element = action.element;
                this.emitChange();
                break;
        }
    }

    getElements() {
        return this.elements;
    }
    getElement() {
        return this.element;
    }
}

export default new CampaignElementStore();