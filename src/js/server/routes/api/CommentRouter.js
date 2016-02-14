import express from 'express';
import authenticationController from '../../controllers/AuthenticationController';
import commentController from '../../controllers/CommentController';

/**
 * As comments may be applied to any entity in the application, when the routes
 * are being applied, the name of the entity as created by the entity middleware
 * and as found in the request must be specified in order for the comment
 * controller to understand where to grab comments from.
 */
export default (/*name*/) => {
    let router = express.Router();
    router.route('/')
        .get(authenticationController.hasRole(['organizer','client']), commentController.list)
        .post(authenticationController.hasRole(['organizer','client']), commentController.create);
    router.route('/:commentId')
        .get(authenticationController.hasRole(['organizer','client']), commentController.read)
        .put(authenticationController.hasRole(['organizer']), commentController.update)
        .delete(authenticationController.hasRole(['organizer']), commentController.delete);

    router.param('commentId', commentController.findById);
    return router;
};