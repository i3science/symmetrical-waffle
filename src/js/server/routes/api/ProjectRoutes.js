import config from '../../../../../config/config';
import projectController from '../../controllers/ProjectController';
import campaignElementController from '../../controllers/CampaignElementController';
import taskController from '../../controllers/TaskController';
import commentController from '../../controllers/CommentController';
import assetController from '../../controllers/AssetController';
import authenticationController from '../../controllers/AuthenticationController';

module.exports = function(app) {
    app.route('/api/projects')
        .get(authenticationController.hasRole(['organizer','client']), projectController.list)
        .post(authenticationController.hasRole(['organizer','client']), projectController.create);
    app.route('/api/projects/:projectId')
        .get(authenticationController.hasRole(['organizer','client']), projectController.read)
        .put(authenticationController.hasRole(['organizer']), projectController.update)
        .delete(authenticationController.hasRole(['organizer']), projectController.delete);
    app.route('/api/projects/:projectId/history')
        .get(authenticationController.hasRole(['organizer','client']), projectController.history);

    app.route('/api/projects/:projectId/elements')
        .get(authenticationController.hasRole(['organizer','client']), campaignElementController.list)
        .post(authenticationController.hasRole(['organizer','client']), campaignElementController.create);
    app.route('/api/projects/:projectId/elements/:elementId')
        .get(authenticationController.hasRole(['organizer','client']), campaignElementController.read)
        .put(authenticationController.hasRole(['organizer']), campaignElementController.update)
        .delete(authenticationController.hasRole(['organizer']), campaignElementController.delete);

    app.route('/api/projects/:projectId/elements/:elementId/tasks')
        .get(authenticationController.hasRole(['organizer','client']), taskController.list)
        .post(authenticationController.hasRole(['organizer','client']), taskController.create);
    app.route('/api/projects/:projectId/elements/:elementId/tasks/:taskId')
        .get(authenticationController.hasRole(['organizer','client']), taskController.read)
        .put(authenticationController.hasRole(['organizer']), taskController.update)
        .delete(authenticationController.hasRole(['organizer']), taskController.delete);

    app.route('/api/projects/:projectId/elements/:elementId/assignees')
        .get(authenticationController.hasRole(['organizer','client']), campaignElementController.listAssignees);

    app.route('/api/projects/:projectId/elements/:elementId/comments')
        .get(authenticationController.hasRole(['organizer','client']), commentController.list)
        .post(authenticationController.hasRole(['organizer','client']), commentController.create);
    app.route('/api/projects/:projectId/elements/:elementId/comments/:commentId')
        .get(authenticationController.hasRole(['organizer','client']), commentController.read)
        .put(authenticationController.hasRole(['organizer']), commentController.update)
        .delete(authenticationController.hasRole(['organizer']), commentController.delete);

    app.route('/api/projects/:projectId/assets')
        .get(authenticationController.hasRole(['organizer','client']), assetController.list)
        .post(authenticationController.hasRole(['organizer','client']), config.uploader.single('file'), assetController.create);
    app.route('/api/projects/:projectId/assets/:assetId')
        .get(authenticationController.hasRole(['organizer','client']), assetController.read)
        .put(authenticationController.hasRole(['organizer']), config.uploader.single('file'), assetController.update)
        .delete(authenticationController.hasRole(['organizer']), assetController.delete);

    app.param('projectId', projectController.findById);
    app.param('elementId', campaignElementController.findById);
    app.param('taskId', taskController.findById);
    app.param('assetId', assetController.findById);
};