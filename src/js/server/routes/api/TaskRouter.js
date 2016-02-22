import express from 'express';
import authenticationController from '../../controllers/AuthenticationController';
import taskController from '../../controllers/TaskController';

let router = express.Router();
router.route('/')
    .get(authenticationController.isLoggedIn, taskController.list)
    .post(authenticationController.isLoggedIn, taskController.create);
router.route('/:taskId')
    .get(authenticationController.isLoggedIn, taskController.read)
    .put(authenticationController.isLoggedIn, taskController.update)
    .delete(authenticationController.hasRole(['organizer']), taskController.delete);

router.param('taskId', taskController.findById);

export default router;