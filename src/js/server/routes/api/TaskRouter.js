import express from 'express';
import authenticationController from '../../controllers/AuthenticationController';
import taskController from '../../controllers/TaskController';

let router = express.Router();
router.route('/')
    .get(authenticationController.hasRole(['organizer','client']), taskController.list)
    .post(authenticationController.hasRole(['organizer','client']), taskController.create);
router.route('/:taskId')
    .get(authenticationController.hasRole(['organizer','client']), taskController.read)
    .put(authenticationController.hasRole(['organizer']), taskController.update)
    .delete(authenticationController.hasRole(['organizer']), taskController.delete);

router.param('taskId', taskController.findById);

export default router;