import projectController from '../../controllers/ProjectController';
import authenticationController from '../../controllers/AuthenticationController';
import assetRouter from './AssetRouter';
import historyRouter from './HistoryRouter';

module.exports = function(app) {
    app.route('/api/projects')
        .get(authenticationController.isLoggedIn, projectController.list)
        .post(authenticationController.hasRole(['organizer','client']), projectController.create);
    app.route('/api/projects/:projectId')
        .get(authenticationController.isLoggedIn, projectController.read)
        .put(authenticationController.hasRole(['organizer']), projectController.update)
        .delete(authenticationController.hasRole(['organizer']), projectController.delete);
    app.route('/api/projects/:projectId/dates').get(authenticationController.isLoggedIn, projectController.dates);
    app.route('/api/projects/:projectId/reject').put(authenticationController.isLoggedIn, projectController.reject);
    app.route('/api/projects/:projectId/revise').put(authenticationController.isLoggedIn, projectController.revise);
    app.route('/api/projects/:projectId/accept').put(authenticationController.isLoggedIn, projectController.accept);

    app.use('/api/projects/:projectId/assets', assetRouter());
    app.use('/api/projects/:projectId/history', historyRouter());

    app.param('projectId', projectController.findById);
};