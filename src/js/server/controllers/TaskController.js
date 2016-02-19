import taskService from '../services/TaskService.js';
import base_controller from './base_controller';
import ErrorUtils from '../utils/ErrorUtils';

export default base_controller(taskService, 'task', {
    list(req, res) {
        return taskService
            .list({ element: req.element._id })
            .then((tasks) => {
                return res.json(tasks);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    },
    create(req, res) {
        let obj = this.sanitize(req.body);
        return taskService
            .create(req.element, obj)
            .spread((task) => {
                return res.status(201).send({ id: task._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
});