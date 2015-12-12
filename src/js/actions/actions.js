import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import InfluencerApi from '../api/dummy-data/user-api';

InfluencerApi.getAllInfluencers();
export default {
    initData() {
        dispatch({
            actionType: AppConstants.INITIALIZE,
            initialData: {
                influencers: InfluencerApi.getAllInfluencers()
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
    }
};