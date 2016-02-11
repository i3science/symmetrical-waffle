import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import taskService from '../services/TaskService';

export default {
    findForElement(project, element) {
        taskService
            .list(project, element._id || element)
            .then((tasks) => {
                dispatch({
                    actionType: AppConstants.REFRESH_TASKS,
                    tasks: tasks
                });
            });
    },
    save(project, element, task) {
        let self = this;
        if (task._id) {
            return taskService
                .update(project, element, task)
                .then(() => {
                    self.findForElement(project, element);
                    return true;
                });
        } else {
            return taskService
                .create(project, element, task)
                .then(() => {
                    self.findForElement(project, element);
                    return true;
                });
        }
    }
};