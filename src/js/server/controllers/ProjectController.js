import _ from 'lodash';
import projectService from '../services/ProjectService.js';
import historyService from '../services/HistoryService.js';
import campaignElementService from '../services/CampaignElementService';
import taskService from '../services/TaskService';
import commentService from '../services/CommentService';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The ProjectController is responsible for interpreting client requests and
 * formatting a response back to the client, often delegating to an
 * ProjectService instance.
 */
class ProjectController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    list(req, res) {
        return projectService
            .list({})
            .then((projects) => {
                return res.json(projects);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the project indicated by the projectId request parameter.
     */
    read(req, res) {
        return res.json(req.project);
    }
    /**
     * Creates a new project account with the given information.
     */
    create(req, res) {
        return projectService
            .create(req.body)
            .spread((project) => {
                return res.status(201).send({ id: project._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing project account with the given modifications.
     */
    update(req, res) {
        return projectService
            .update(req.project, req.body)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing project account.
     */
    delete(req, res) {
        return projectService
            .remove(req.project)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Return the history of modifications for an existing project.
     */
    history(req, res) {
        let history = [];
        let elementIds = [];
        return historyService
            .list({ 'eventable.type': 'Project', 'eventable.id': req.project._id })
            .then((projectHistory) => {
                history = history.concat(projectHistory);
                return campaignElementService
                    .list({ project: req.project._id });
            })
            // Get element history
            .then((elements) => {
                elementIds = elements.map((el) => { return el._id; });
                return historyService
                    .list({ 'eventable.type': 'CampaignElement', 'eventable.id': { $in: elementIds } });
            })
            .then((elementHistory) => {
                history = history.concat(elementHistory);
                return true;
            })
            // Get task history
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
                history = history.concat(taskHistory);
                return commentService
                    .list({ target_type: 'CampaignElement', target_id: { $in: elementIds }});
            })
            .then((comments) => {
                let ids = comments.map((comment) => { return comment._id; });
                return historyService
                    .list({ 'eventable.type': 'Comment', 'eventable.id': { $in: ids }});
            })
            .then((commentHistory) => {
                history = history.concat(commentHistory);
                history = _.sortBy(history, (val) => { return new Date(val.created_at); });
                return res.jsonp(history);
            });
    }

    /**
     * Project middleware
     */
    findById(req, res, next, id) {
        projectService
            .findOne({ _id: id })
            .then((project) => {
                req.project = project;
                return next();
            })
            .fail((err) => {
                return next(err);
            });
    }
}

export default new ProjectController();