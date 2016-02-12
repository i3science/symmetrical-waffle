import taskService from '../services/TaskService.js';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The TaskController is responsible for interpreting client requests
 * and formatting a response back to the client, often delegating to an
 * CampaignElementService instance.
 */
export default class TaskController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    static list(req, res) {
        return taskService
            .list(req.element._id)
            .then((tasks) => {
                return res.json(tasks);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the task indicated by the taskId request parameter.
     */
    static read(req, res) {
        return res.json(req.task);
    }
    /**
     * Creates a new task account with the given information.
     */
    static create(req, res) {
        return taskService
            .create(req.element, req.body)
            .spread((task) => {
                return res.status(201).send({ id: task._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing task account with the given modifications.
     */
    static update(req, res) {
        return taskService
            .update(req.task, req.body)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing task account.
     */
    static delete(req, res) {
        return taskService
            .remove(req.task)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Element middleware
     */
    static findById(req, res, next, taskId) {
        taskService
            .findOne({ _id: taskId })
            .then((task) => {
                req.task = task;
                return next();
            })
            .fail((err) => {
                return next(err);
            });
    }
}