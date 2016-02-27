import express from 'express';
import config from '../../../../../config/config';
import authenticationController from '../../controllers/AuthenticationController';
import assetController from '../../controllers/AssetController';

/**
 * As assets may be aplpied to any entity in the application, when the routes
 * are being applied, the name of the entity as created by the entity middleware
 * and as found in the request must be specified in order for the asset
 * controller to understand where to grab assets from.
 */
export default (/*name*/) => {
    let router = express.Router();
    router.route('/')
        .get(authenticationController.hasRole(['organizer','rep']), assetController.list)
        .post(authenticationController.hasRole(['organizer','rep']), config.uploader.single('file'), assetController.create);
    router.route('/:assetId')
        .get(authenticationController.hasRole(['organizer','rep']), assetController.read)
        .put(authenticationController.hasRole(['organizer']), config.uploader.single('file'), assetController.update)
        .delete(authenticationController.hasRole(['organizer']), assetController.delete);

    router.param('assetId', assetController.findById);
    return router;
};