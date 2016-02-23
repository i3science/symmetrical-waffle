import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import projectService from '../services/ProjectService';
import projectStore from '../stores/ProjectStore';

export default {
    refreshProjects() {
        projectService
            .list()
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
                actionType: AppConstants.SET_CURRENT_PROJECT,
                project: cachedProject
            });
            return;
        }
        projectService
            .find(id)
            .then((project) => {
                dispatch({
                    actionType: AppConstants.SET_CURRENT_PROJECT,
                    project: project
                });
            });
    }

};