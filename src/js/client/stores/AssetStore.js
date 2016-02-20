import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class AssetStore extends BaseStore {

    constructor() {
        super();
        this.assets = [];
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.REFRESH_ASSETS:
                this.assets = action.assets;
                this.emitChange();
                break;
            case AppConstants.CREATED_ASSET:
                this.assets.push(action.asset);
                this.emitChange();
                break;
        }
    }

    getAssets() {
        return this.assets;
    }
}

export default new AssetStore();