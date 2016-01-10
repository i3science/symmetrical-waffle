import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import influencerService from '../services/InfluencerService';

export default {
    initData() {
        influencerService.list().then(results => {
            dispatch({
                actionType: AppConstants.INITIALIZE,
                initialData: {
                    influencers: results,
                    selectedInfluencers: []
                }
            });
        });
    },
    addUser(user) {
        dispatch({
            actionType: AppConstants.ADD_USER, user
        });
    },
    updateUser(user) {
        dispatch({
            actionType: AppConstants.UPDATE_USER, user
        });
    },
    addInfluencerToList(influencer) {
        dispatch({
            actionType: AppConstants.ADD_INFLUENCER_TO_LIST, influencer
        });
    },
    updateResults(influencers) {
        dispatch({
            actionType: AppConstants.INFLUENCER_RESULTS, influencers
        });
    },
    addFilter(id, val) {
        dispatch({
            actionType: AppConstants.ADD_FILTER, id, val
        });
    },
    removeFilter(id) {
        dispatch({
            actionType: AppConstants.REMOVE_FILTER, id
        });
    }
};