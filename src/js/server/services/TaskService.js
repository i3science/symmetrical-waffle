import mongoose from 'mongoose';
import base_service from './base_service';
let Task = mongoose.model('Task');

export default base_service(Task, {
    list(opts) {
        return Task
            .find(opts || {})
            .populate('assignee')
            .exec();
    },
    create(element, task) {
        task = new Task(task);
        task.element = element._id || element;
        return task.savePromise();
    }
});