import _ from 'lodash';
import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import influencerService from '../services/InfluencerService';
import projectService from '../services/ProjectService';
import listService from '../services/ListService';
import assetService from '../services/AssetService';
import reviewService from '../services/ReviewService';
import clientService from '../services/ClientService';

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
    toggleInfluencerToList(influencer, selected) {
        dispatch({
            actionType: AppConstants.TOGGLE_INFLUENCER_TO_LIST, influencer, selected
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

    createProject(project) {
        return projectService.create(project)
            .then((response) => {
                return projectService.find(response.id);
            })
            .then((data) => {
                dispatch({
                    actionType: AppConstants.UPDATE_PROJECT,
                    project: data
                });
                return true;
            });
    },

    updateProject(project) {
        console.log(project);
        projectService.update(project)
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error occurred while updating the project');
                }
                return projectService.find(project._id);
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

    createList(list) {
        return listService.create(list)
            .then((data) => {
                dispatch({
                    actionType: AppConstants.CREATE_LIST,
                    project: data
                });
                return true;
            });
    },

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
    uploadAsset(project, asset, uri, name) {
        assetService
            .create(project, asset)
            .then((result) => {
                if (result.id) {
                    dispatch({
                        actionType: AppConstants.CREATED_ASSET,
                        asset: _.extend(asset, {_id: result.id, datauri:uri, name:name})
                    });
                } else {
                    // TODO Message about failure
                }
            });
    },

    // Review actions

    findReviewsForInfluencer(influencer) {
        reviewService
            .list(influencer)
            .then((reviews) => {
                dispatch({
                    actionType: AppConstants.REFRESH_REVIEWS,
                    reviews: reviews
                });
            });
    },

    // Client actions

    listClients() {
        clientService
            .list()
            .then((clients) => {
                dispatch({
                    actionType: AppConstants.REFRESH_CLIENTS,
                    clients: clients
                });
            });
    }
};