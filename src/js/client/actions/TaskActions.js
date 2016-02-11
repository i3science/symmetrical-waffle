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
        if (task._id) {
            taskService
                .update(project, element, task)
                .then(() => {
                    dispatch({
                        actionType: AppConstants.TASK_UPDATED,
                        task: task
                    });
                })
                .catch(() => {
                    dispatch({
                        actionType: AppConstants.TASK_UPDATED_FAILED
                    });
                });
        } else {
            taskService
                .create(project, element, task)
                .then((id) => {
                    console.log('ID: ', id);
                    task._id = id
                    dispatch({
                        actionType: AppConstants.TASK_CREATED,
                        task: task
                    });
                })
                .catch(() => {
                    dispatch({
                        actionType: AppConstants.TASK_CREATED_FAILED
                    });
                });
        }
    }
};