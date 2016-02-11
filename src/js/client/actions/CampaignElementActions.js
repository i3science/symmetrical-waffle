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
    }
};