import express from 'express';
import config from '../../../../../config/config';
import authenticationController from '../../controllers/AuthenticationController';
import taskController from '../../controllers/TaskController';

let router = express.Router();
router.route('/')
    .get(authenticationController.isLoggedIn, taskController.list)
    .post(authenticationController.isLoggedIn, config.uploader.single('file'), taskController.create);
router.route('/:taskId')
    .get(authenticationController.isLoggedIn, taskController.read)
    .put(authenticationController.isLoggedIn, config.uploader.single('file'), taskController.update)
    .delete(authenticationController.hasRole(['organizer']), taskController.delete);
router.route('/:taskId/file')
	.get(authenticationController.isLoggedIn, taskController.file);

router.param('taskId', taskController.findById);

export default router;