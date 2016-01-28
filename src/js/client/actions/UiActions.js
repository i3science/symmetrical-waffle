import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import influencerService from '../services/InfluencerService';

export default {
    initData() {
        influencerService.list().then(response => {
            dispatch({
                actionType: AppConstants.INITIALIZE,
                initialData: {
                    influencers: response.content,
                    selectedInfluencers: []
                }
            });
        });
    },
    createInfluencer(influencer) {
        influencerService.save(influencer)
        .then(function(response){
            return influencerService.find(response.content.id);
        })
        .then(function(response) {
            dispatch({
                actionType: AppConstants.CREATE_INFLUENCER,
                influencer: response.content
            });
        });
    },
    updateInfluencer(influencer) {
        influencerService.save(influencer)
            .then(function(response) {
                dispatch({
                    actionType: AppConstants.UPDATE_INFLUENCER,
                    influencer: response.content
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