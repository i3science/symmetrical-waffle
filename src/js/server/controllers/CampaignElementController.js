import campaignElementService from '../services/CampaignElementService.js';
import base_controller from './base_controller';
import ErrorUtils from '../utils/ErrorUtils';

export default base_controller(campaignElementService, 'element', {
    list(req, res) {
        return campaignElementService
            .list({ project: req.project._id })
            .then((elements) => {
                return res.json(elements);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    },
    listAssignees(req, res) {
        return campaignElementService
            .listAssignees(req.project, req.element)
            .then((assignees) => {
                return res.jsonp(assignees);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
});