import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';

class SearchStore extends BaseStore {

    constructor() {
        super();
        this.filters = {
            personal: {},
            mediums: [],
            verticals: []
        };
        this.results = [];
        this.colors = [
            '#546E7B',
            '#F5511E',
            '#FDD832',
            '#43A149',
            '#01897B',
            '#D81A60',
            '#9123AA',
            '#ffcc80',
            '#ffe0b2',
            '#fff3e0'
        ];
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
            case AppConstants.UPDATE_FILTERS:
                this.filters = action.filters;
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