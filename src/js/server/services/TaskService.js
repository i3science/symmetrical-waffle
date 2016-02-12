import mongoose from 'mongoose';
import _ from 'lodash';
let Task = mongoose.model('Task');

/**
 * The TaskService is responsible for persisting and retrieving information to
 * and from the underlying datastore in a consistent manner.
 */
export default class TaskService {
    /**
     * Retrieve zero or more tasks that match the given options.
     * @param opts 
     * @todo Document available options
     */
    static list(opts) {
        return Task
            .find(opts || {})
            .populate('assignee')
            .exec();
    }

    /**
     * Retrieve zero or one tasks that match the given options. In the
     * event that more than one task matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static findOne(opts) {
        return Task
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new task entity.
     * @param task The representation of the task to persist
     */
    static create(element, task) {
        task = new Task(task);
        task.element = element;
        return task.savePromise();
    }

    /**
     * Update an existing task entity.
     * @param task The representation of the task to update
     */
    static update(task, modified) {
        _.extend(task, modified);
        return task.savePromise();
    }

    /**
     * Delete the task represented by the given entity or identifier.
     * @param task A JSON representation or identifier
     */
    delete(task) {
        return task.removePromise();
    }
}