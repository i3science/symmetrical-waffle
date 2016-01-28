import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import projectService from '../services/ProjectService';

export default {
    refreshProjects() {
        projectService.list().then((response) => {
            dispatch({
                actionType: AppConstants.REFRESH_PROJECTS,
                projects: response.content
            });
        });
    }
};