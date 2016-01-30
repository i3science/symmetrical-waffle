import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import projectService from '../services/ProjectService';

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
    }
};