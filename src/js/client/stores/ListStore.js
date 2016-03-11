import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';
import _ from 'lodash';

class ListStore extends BaseStore {

    constructor() {
        super();
        this.currentList = null;
        this.lists = [];
        this.adding = false;
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
            case AppConstants.SET_CURRENT_LIST:
                this.currentList = action.list;
                this.adding = action.add;
                this.emitChange();
                break;
            case AppConstants.CLEAR_CURRENT_LIST:
                this.currentList = {};
                this.emitChange();
                break;
        }
    }
    isAdding() {
        return this.adding;
    }
    getLists() {
        return this.lists;
    }
    getCurrentList() {
        return this.currentList;
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