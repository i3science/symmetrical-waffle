import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import projectService from '../services/ProjectService';
import projectStore from '../stores/ProjectStore';

export default {
    refreshProjects() {
        projectService
            .list()
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch({
                    actionType: AppConstants.REFRESH_PROJECTS,
                    projects: data
                });
            });
    },

    findById(id) {
        let cachedProject = projectStore.getProjectById(id);
        if (cachedProject) {
            dispatch({
                actionType: AppConstants.GET_PROJECT,
                project: cachedProject
            });
            return;
        }
        projectService
            .find(id)
            .then((project) => {
                dispatch({
                    actionType: AppConstants.GET_PROJECT,
                    project: project
                });
            });
    }

};