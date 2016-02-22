import config from '../../../../config/config';
import projectController from '../controllers/ProjectController';
import assetController from '../controllers/AssetController';
import authenticationController from '../controllers/AuthenticationController';

module.exports = function(app) {
    app.route('/projects/:projectId/assets')
        .post(authenticationController.hasRole(['organizer','client']), config.uploader.single('file'), assetController.create);
    app.route('/projects/:projectId/assets/:assetId')
        .get(authenticationController.hasRole(['organizer']), assetController.read)
        .put(authenticationController.hasRole(['organizer']), config.uploader.single('file'), assetController.update);
    app.route('/projects/:projectId/assets/:assetId/file')
        .get(authenticationController.hasRole(['organizer']), assetController.file);

    app.param('projectId', projectController.findById);
    app.param('assetId', assetController.findById);
};