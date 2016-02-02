import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import influencerService from '../services/InfluencerService';

export default {
    initialize() {
        dispatch({
            actionType: AppConstants.INITIALIZE
        });
    },
    refreshInfluencerList() {
        influencerService
            .list()
            .then((response) => {
                return response.json();
            })
            .then((data) =>{
                dispatch({
                    actionType: AppConstants.INFLUENCER_LIST_REFRESHED,
                    influencers: data,
                    selectedInfluencers: []
                });
            });
    },
    createInfluencer(influencer) {
        influencerService.create(influencer)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return influencerService.find(data.id);
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch({
                    actionType: AppConstants.CREATE_INFLUENCER,
                    influencer: data
                });
            });
    },
    updateInfluencer(influencer) {
        influencerService.update(influencer)
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error occurred while updating the influencer');
                }
                return influencerService.find(influencer._id);
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch({
                    actionType: AppConstants.UPDATE_INFLUENCER,
                    influencer: data
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
    },

    receivedErrors(errors) {
        dispatch({
            actionType: AppConstants.RECEIVED_ERRORS,
            errors: errors
        });
    }
};