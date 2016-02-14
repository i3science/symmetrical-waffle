import projectController from '../../controllers/ProjectController';
import authenticationController from '../../controllers/AuthenticationController';
import assetRouter from './AssetRouter';
import historyRouter from './HistoryRouter';

module.exports = function(app) {
    app.route('/api/projects')
        .get(authenticationController.hasRole(['organizer','client']), projectController.list)
        .post(authenticationController.hasRole(['organizer','client']), projectController.create);
    app.route('/api/projects/:projectId')
        .get(authenticationController.hasRole(['organizer','client']), projectController.read)
        .put(authenticationController.hasRole(['organizer']), projectController.update)
        .delete(authenticationController.hasRole(['organizer']), projectController.delete);

    app.use('/api/projects/:projectId/assets', assetRouter());
    app.use('/api/projects/:projectId/history', historyRouter());

    app.param('projectId', projectController.findById);
};