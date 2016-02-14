import authenticationController from '../../controllers/AuthenticationController';
import campaignElementController from '../../controllers/CampaignElementController';
import taskRouter from './TaskRouter';
import commentRouter from './CommentRouter';

module.exports = function(app) {
    app.route('/api/projects/:projectId/elements')
        .get(authenticationController.hasRole(['organizer','client']), campaignElementController.list)
        .post(authenticationController.hasRole(['organizer','client']), campaignElementController.create);
    app.route('/api/projects/:projectId/elements/:elementId')
        .get(authenticationController.hasRole(['organizer','client']), campaignElementController.read)
        .put(authenticationController.hasRole(['organizer']), campaignElementController.update)
        .delete(authenticationController.hasRole(['organizer']), campaignElementController.delete);

    app.route('/api/projects/:projectId/elements/:elementId/assignees')
        .get(authenticationController.hasRole(['organizer','client']), campaignElementController.listAssignees);

    app.use('/api/projects/:projectId/elements/:elementId/tasks', taskRouter);
    app.use('/api/projects/:projectId/elements/:elementId/comments', commentRouter('element'));

    app.param('elementId', campaignElementController.findById);
};