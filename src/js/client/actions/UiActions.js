import _ from 'lodash';
import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import influencerService from '../services/InfluencerService';
import projectService from '../services/ProjectService';
import listService from '../services/ListService';
import assetService from '../services/AssetService';

export default {
    initialize() {
        dispatch({
            actionType: AppConstants.INITIALIZE
        });
    },

    // Influencer Actions

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
    updateFilters(filters) {
        dispatch({
            actionType: AppConstants.UPDATE_FILTERS, filters
        });
    },
    resetFilters() {
        dispatch({
            actionType: AppConstants.RESET_FILTERS
        });
    },

     // Project Actions

    updateProject(project) {
        projectService.update(project)
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error occurred while updating the project');
                }
                return projectService.find(project._id);
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch({
                    actionType: AppConstants.UPDATE_PROJECT,
                    project: data
                });
            });
    },
    setCurrentProject(id) {
        dispatch({
            actionType: AppConstants.SET_CURRENT_PROJECT, id
        });
    },
    addListToProject(lid, pid) {
        // TODO add action to DB, it's currently in the Project Store (as it's impacting project list)
        dispatch({
            actionType: AppConstants.ADD_LIST_TO_PROJECT, lid, pid
        });
    },

    // List Actions

    refreshLists() {
        listService
            .list()
            .then((lists) => {
                dispatch({
                    actionType: AppConstants.REFRESH_LISTS,
                    lists: lists
                });
            });
    },

    // User actions

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

    // Asset actions

    findAssetsForProject(project) {
        assetService
            .list(project)
            .then((assets) => {
                dispatch({
                    actionType: AppConstants.REFRESH_ASSETS,
                    assets: assets
                });
            });
    },
    uploadAsset(project, asset, uri) {
        assetService
            .create(project, asset)
            .then((result) => {
                if (result.id) {
                    dispatch({
                        actionType: AppConstants.CREATED_ASSET,
                        asset: _.extend(asset, {_id: result.id, datauri:uri})
                    });
                } else {
                    // TODO Message about failure
                }
            });
    }
};