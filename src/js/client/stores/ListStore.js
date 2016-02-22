import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';
import _ from 'lodash';

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
            case AppConstants.CREATE_LIST:
                this.lists.push(action.list);
                this.emitChange();
                break;
            case AppConstants.REFRESH_LISTS:
                this.lists = action.lists;
                this.emitChange();
                break;
        }
    }

    getLists() {
        return this.lists;
    }
    getListById(id) {
        return _.find(this.lists, { _id: id });
    }
    getInfluencersFromList(lists) {
        var results = [];
        lists.map(item => {
            let inter = _.find(this.lists, { _id: item });
            if (inter) {
                results = _.union(results, inter.influencers);
            }
        });
        return (results.length > 0) ? results : null;
    }
}

export default new ListStore();