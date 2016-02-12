import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class CampaignElementStore extends BaseStore {

    constructor() {
        super();
        this.elements = null;
        this.element = null;
        this.assignees = null;
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
            case AppConstants.LIST_ELEMENT_ASSIGNEES:
                this.assignees = action.assignees;
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
    getAssignees() {
        return this.assignees;
    }
}

export default new CampaignElementStore();