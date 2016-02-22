import express from 'express';
import authenticationController from '../../controllers/AuthenticationController';
import reviewRouter from '../../controllers/ReviewController';

export default () => {
    let router = express.Router();
    router.route('/')
        .get(authenticationController.hasRole(['organizer','client']), reviewRouter.list)
        .post(authenticationController.hasRole(['organizer','client']), reviewRouter.create);
    router.route('/:reviewId')
        .get(authenticationController.hasRole(['organizer','client']), reviewRouter.read)
        .put(authenticationController.hasRole(['organizer']), reviewRouter.update)
        .delete(authenticationController.hasRole(['organizer']), reviewRouter.delete);

    router.param('reviewId', reviewRouter.findById);
    return router;
};