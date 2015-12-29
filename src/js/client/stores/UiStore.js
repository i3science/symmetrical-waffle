import _ from 'lodash';
import AppConstants from '../constants/constants';
import { register } from '../dispatcher/dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var _influencers = [],
    _influencerList = [],
    _filters = [],
    _colors = ['#e65100', '#ef6c00', '#f57c00', '#fb8c00', '#ff9800', '#ffa726', '#ffb74d', '#ffcc80', '#ffe0b2', '#fff3e0'];

const AppStore = Object.assign(EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getAllInfluencers() {
        return _influencers;
    },
    getSelectedInfluencers() {
        return _influencerList;
    },
    getInfluencerById(id) {
        return _.find(_influencers, {id:id});
    },
    getColors() {
        return _colors;
    },
    getAllFilters() {
        return _filters;
    },
    dispatcherIndex: register(function(action) {
        switch(action.actionType) {
            case AppConstants.INITIALIZE:
                _influencers = action.initialData.influencers;
                _influencerList = action.initialData.influencerList;
                break;
            case AppConstants.ADD_INFLUENCER_TO_LIST:
                _influencerList.push(action.influencer);
                break;
            case AppConstants.ADD_FILTER:
                _filters.push(action.id);
                // filter state with updated filters
                break;
            case AppConstants.REMOVE_FILTER:
                _.pull(_filters, action.id);
                break;
        }
        AppStore.emitChange();
    })
});

export default AppStore;