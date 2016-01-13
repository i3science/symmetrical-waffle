import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';
import _ from 'lodash';

class SearchStore extends BaseStore {

    constructor() {
        super();
        this.filters = [];
        this.results = [];
        this.colors = ['#e65100', '#ef6c00', '#f57c00', '#fb8c00', '#ff9800', '#ffa726', '#ffb74d', '#ffcc80', '#ffe0b2', '#fff3e0'];
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.INFLUENCER_RESULTS:
                this.results = action.influencers;
                this.emitChange();
                break;
            case AppConstants.ADD_FILTER:
                let isFilter = _.find(this.filters, {id: action.id});
                let filterIndex = _.indexOf(this.filters, isFilter);
                if (filterIndex === -1) {
                    this.filters.push({id: action.id, val: action.val});
                } else {
                    if (action.val) {
                        this.filters.splice(filterIndex, 1, {id: action.id, val: action.val});
                    } else {
                        _.remove(this.filters, function(filter){
                            return action.id === filter.id;
                        });
                    }
                }
                this.emitChange();
                break;
            case AppConstants.REMOVE_FILTER:
                _.pull(this.filters, action.id);
                this.emitChange();
                break;
        }
    }

    getFilters() {
        return this.filters;
    }
    getResults() {
        return this.results;
    }
    getColors() {
        return this.colors;
    }
}

export default new SearchStore();