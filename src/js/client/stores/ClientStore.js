import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class ClientStore extends BaseStore {

    constructor() {
        super();
        this.clients = null;
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_CLIENTS:
                this.clients = action.clients;
                this.emitChange();
        }
    }

    getClients() {
        return this.clients;
    }
}

export default new ClientStore();