import _ from 'lodash';
import AppConstants from '../constants/constants';
import { register } from '../dispatcher/dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var _influencers = [],
    _influencerList = [],
    _resultsList = [],
    _filters = [],
    _colors = [
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
    getResults() {
        return _resultsList;
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
            case AppConstants.INFLUENCER_RESULTS:
                _resultsList = action.influencers;
                break;
            case AppConstants.ADD_FILTER:
                let isFilter = _.find(_filters, {id: action.id});
                let filterIndex = _.indexOf(_filters, isFilter);
                if (filterIndex === -1) {
                    _filters.push({id: action.id, val: action.val});
                } else {
                    if (action.val) {
                        _filters.splice(filterIndex, 1, {id: action.id, val: action.val});
                    } else {
                        _.remove(_filters, function(filter){
                            return action.id === filter.id;
                        });
                    }
                }
                break;
            case AppConstants.REMOVE_FILTER:
                _.pull(_filters, action.id);
                break;
        }
        AppStore.emitChange();
    })
});

export default AppStore;