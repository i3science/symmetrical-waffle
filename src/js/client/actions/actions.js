import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import InfluencerService from '../services/InfluencerService';

export default {
    initData() {
        InfluencerService
            .list()
            .then(function(results){
                dispatch({
                    actionType: AppConstants.INITIALIZE,
                    initialData: {
                        influencers: results,
                        influencerList: []
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
    addFilter(id) {
        dispatch({
            actionType: AppConstants.ADD_FILTER, id
        });
    },
    removeFilter(id) {
        dispatch({
            actionType: AppConstants.REMOVE_FILTER, id
        });
    }
};