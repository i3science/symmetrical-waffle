import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import campaignElementService from '../services/CampaignElementService';

export default {
    findForProject(project) {
        campaignElementService
            .list(project)
            .then((elements) => {
                dispatch({
                    actionType: AppConstants.REFRESH_ELEMENTS,
                    elements: elements
                });
            });
    },
    findForProjectAndId(project, element) {
        campaignElementService
            .find(project, element)
            .then((element) => {
                dispatch({
                    actionType: AppConstants.GET_ELEMENT,
                    element: element
                });
            });
    },
    listAssignees(project, element) {
        campaignElementService
            .listAssignees(project, element)
            .then((assignees) => {
                dispatch({
                    actionType: AppConstants.LIST_ELEMENT_ASSIGNEES,
                    assignees: assignees
                });
            });
    }
};