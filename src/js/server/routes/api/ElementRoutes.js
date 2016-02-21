import authenticationController from '../../controllers/AuthenticationController';
import campaignElementController from '../../controllers/CampaignElementController';
import taskRouter from './TaskRouter';
import commentRouter from './CommentRouter';

module.exports = function(app) {
    app.route('/api/projects/:projectId/elements')
        .get(authenticationController.isLoggedIn, campaignElementController.list)
        .post(authenticationController.hasRole(['organizer','client']), campaignElementController.create);
    app.route('/api/projects/:projectId/elements/:elementId')
        .get(authenticationController.hasRole(['organizer','client']), campaignElementController.read)
        .put(authenticationController.isLoggedIn, campaignElementController.update)
        .delete(authenticationController.hasRole(['organizer']), campaignElementController.delete);

    app.route('/api/projects/:projectId/elements/:elementId/assignees')
        .get(authenticationController.isLoggedIn, campaignElementController.listAssignees);

    app.route('/api/projects/:projectId/elements/:elementId/history')
        .get(authenticationController.isLoggedIn, campaignElementController.history);

    app.use('/api/projects/:projectId/elements/:elementId/tasks', taskRouter);
    app.use('/api/projects/:projectId/elements/:elementId/comments', commentRouter('element'));

    app.param('elementId', campaignElementController.findById);
};