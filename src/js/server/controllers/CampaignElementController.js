import campaignElementService from '../services/CampaignElementService.js';
import historyService from '../services/HistoryService';
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
    },

    /**
     * Return the history of modifications for an existing element.
     */
    history(req, res) {
        return historyService
            .list({ 'eventable.type': 'CampaignElement', 'eventable.id': req.element._id })
            .then((elementHistory) => {
                return res.jsonp(elementHistory);
            });
    }
});