import _ from 'lodash';
import base_controller from './base_controller';
import projectService from '../services/ProjectService.js';
import historyService from '../services/HistoryService.js';
import campaignElementService from '../services/CampaignElementService';
import taskService from '../services/TaskService';
import commentService from '../services/CommentService';

export default base_controller(projectService, 'project', {
    /**
     * Return the history of modifications for an existing project.
     */
    history(req, res) {
        let historyArray = [];
        let elementIds = [];
        return historyService
            .list({ 'eventable.type': 'Project', 'eventable.id': req.project._id })
            .then((projectHistory) => {
                historyArray = historyArray.concat(projectHistory);
                return campaignElementService
                    .list({ project: req.project._id });
            })
            // Get element historyArray
            .then((elements) => {
                elementIds = elements.map((el) => { return el._id; });
                return historyService
                    .list({ 'eventable.type': 'CampaignElement', 'eventable.id': { $in: elementIds } });
            })
            .then((elementHistory) => {
                historyArray = historyArray.concat(elementHistory);
                return true;
            })
            // Get task historyArray
            .then(() => {
                return taskService
                    .list({ element: elementIds });
            })
            .then((tasks) => {
                let ids = tasks.map((task) => { return task._id; });
                return historyService
                    .list({ 'eventable.type': 'Task', 'eventable.id': { $in: ids } });
            })
            .then((taskHistory) => {
                historyArray = historyArray.concat(taskHistory);
                return commentService
                    .list({ target_type: 'CampaignElement', target_id: { $in: elementIds }});
            })
            .then((comments) => {
                let ids = comments.map((comment) => { return comment._id; });
                return historyService
                    .list({ 'eventable.type': 'Comment', 'eventable.id': { $in: ids }});
            })
            .then((commentHistory) => {
                historyArray = historyArray.concat(commentHistory);
                historyArray = _.sortBy(historyArray, (val) => { return new Date(val.created_at); });
                return res.jsonp(historyArray);
            });
    },
    sanitize(obj) {
        obj.organization = obj.organization._id || obj.organization;
        obj.client = obj.client._id || obj.client;
        delete obj.__v;
        return obj;
    }
});