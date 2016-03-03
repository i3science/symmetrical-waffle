import _ from 'lodash';
import Q from 'q';
import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import influencerService from '../services/InfluencerService';
import projectService from '../services/ProjectService';
import listService from '../services/ListService';
import assetService from '../services/AssetService';
import reviewService from '../services/ReviewService';
import clientService from '../services/ClientService';
import representativeService from '../services/RepresentativeService';
import userService from '../services/UserService';

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
        return influencerService.create(influencer)
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
                Materialize.toast('Successfully created influencer.', 4000, 'success'); // eslint-disable-line no-undef
                dispatch({
                    actionType: AppConstants.CREATE_INFLUENCER,
                    influencer: data
                });
                return data;
            });
    },
    updateInfluencer(influencer) {
        return influencerService.update(influencer)
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error occurred while updating the influencer'); // eslint-disable-line no-undef
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
                Materialize.toast('Successfully updated influencer.', 4000); // eslint-disable-line no-undef
                return data;
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
    sendInfluencer(influencer) {
        if (!influencer._id) {
            Materialize.toast('Influencer has not yet been saved.', 4000, 'error'); // eslint-disable-line no-undef
            return Q(false);
        }
        return influencerService.send(influencer)
            .then(() => {
                Materialize.toast('An email has been sent to the influencer.', 4000); // eslint-disable-line no-undef
                return true;
            })
            .fail((err) => {
                Materialize.toast(err, 4000, 'error'); // eslint-disable-line no-undef
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

    updateProject(project, add) {
        projectService.update(project)
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error occurred while updating the project');
                }
                return projectService.find(project._id);
            })
            .then((data) => {
                dispatch({
                    actionType: AppConstants.UPDATE_PROJECT, add,
                    project: data
                });
            });
    },

    influencerRejectProject(project, notes) {
        projectService.influencerReject(project, notes)
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error occurred while processing your request');
                }
                Materialize.toast('Your choice has been successfully recorded', 4000); // eslint-disable-line no-undef
                // TODO Redirect somewhere else
            });
    },

    influencerReviseProject(project, notes) {
        projectService.influencerRevise(project, notes)
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error occurred while processing your request');
                }
                Materialize.toast('Your request has been successfully recorded', 4000); // eslint-disable-line no-undef
                // TODO Redirect somewhere else
            });
    },

    influencerAcceptProject(project, notes) {
        projectService.influencerAccept(project, notes)
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error occurred while processing your request');
                }
                Materialize.toast('Your acceptance has been recorded. You will be notified when the project begins.', 4000); // eslint-disable-line no-undef
                // TODO Redirect somewhere else
            });
    },

    getProjectDates(project, callback) {
        return projectService.getDates(project)
            .then((milestones) => {
                if (callback) {
                    callback(milestones);
                }
                return milestones;
            });
    },

    approveProject(project, callback) {
        return projectService.approve(project)
            .then(() => {
                return projectService
                    .find(project._id);
            })
            .then((project) => {
                Materialize.toast('The project has been approved.', 4000); // eslint-disable-line no-undef
                if (callback) {
                    callback();
                }
                dispatch({
                    actionType: AppConstants.SET_CURRENT_PROJECT,
                    project: project
                });
                return true;
            });
    },

    sendProjectToClient(project, callback) {
        return projectService.sendToClient(project)
            .then(() => {
                Materialize.toast('The project has been sent to the client.', 4000); // eslint-disable-line no-undef
                if (callback) {
                    callback();
                }
                return true;
            });
    },

    // The 'add' parameter is to indicate if it's setting project to be
    // used in conjunction with an adding action (lists or influencers)
    setCurrentProject(project, add) {
        dispatch({
            actionType: AppConstants.SET_CURRENT_PROJECT, project, add
        });
    },

    clearCurrentProject() {
        dispatch({
            actionType: AppConstants.CLEAR_CURRENT_PROJECT
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
    setCurrentList(list) {
        dispatch({
            actionType: AppConstants.SET_CURRENT_LIST, list
        });
    },
    clearCurrentList() {
        dispatch({
            actionType: AppConstants.CLEAR_CURRENT_LIST
        });
    },


    // User actions

    addUser(user) {
        dispatch({
            actionType: AppConstants.ADD_USER, user
        });
    },
    updateUser(user) {
        return userService.update(user)
            .then(() => {
                dispatch({
                    actionType: AppConstants.UPDATE_USER, user
                });
                Materialize.toast('Successfully updated account', 4000); // eslint-disable-line no-undef
                return true;
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
    },

    // Representative actions

    refreshRepresentatives() {
        representativeService
            .list()
            .then((reps) => {
                dispatch({
                    actionType: AppConstants.REFRESH_REPRESENTATIVES,
                    representatives: reps
                });
            });
    },
    findRepresentative(id) {
        representativeService
            .find(id)
            .then((rep) => {
                dispatch({
                    actionType: AppConstants.FIND_REPRESENTATIVE,
                    representative: rep
                });
            });
    },
    createRepresentative(rep) {
        return representativeService.create(rep)
            .then((response) => {
                return representativeService.find(response.id);
            })
            .then((data) => {
                dispatch({
                    actionType: AppConstants.UPDATE_REPRESENTATIVE,
                    representative: data
                });
                return data;
            });
    },
    updateRepresentative(representative) {
        return representativeService.update(representative)
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error occurred while updating the representative');
                }
                return representativeService.find(representative._id);
            })
            .then((data) => {
                dispatch({
                    actionType: AppConstants.UPDATE_REPRESENTATIVE,
                    representative: data
                });
                return data;
            });
    }
};