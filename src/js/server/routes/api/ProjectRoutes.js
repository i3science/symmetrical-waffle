import projectController from '../../controllers/ProjectController';
import campaignElementController from '../../controllers/CampaignElementController';
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

    app.param('projectId', projectController.findById);
    app.param('elementId', campaignElementController.findById);
};