import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import InfluencerApi from '../api/dummy-data/user-api';

InfluencerApi.getAllInfluencers();
export default {
    initData() {
        dispatch({
            actionType: AppConstants.INITIALIZE,
            initialData: {
                influencers: InfluencerApi.getAllInfluencers(),
                influencerList: []
            }
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