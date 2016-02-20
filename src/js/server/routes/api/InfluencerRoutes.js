import influencerController  from '../../controllers/InfluencerController';
import authenticationController from '../../controllers/AuthenticationController';
import reviewRouter from './ReviewRouter.js';

module.exports = function(app) {
    app.route('/api/influencers')
        .get(authenticationController.hasRole(['organizer','client']), influencerController.list)
        .post(authenticationController.hasRole(['organizer','client']), influencerController.create);
    app.route('/api/influencers/:influencerId')
        .get(authenticationController.hasRole(['organizer','client']), influencerController.read)
        .put(authenticationController.hasRole(['organizer']), influencerController.update)
        .delete(authenticationController.hasRole(['organizer']), influencerController.delete);
    app.param('influencerId', influencerController.findById);

    app.use('/api/influencers/:influencerId/reviews', reviewRouter());
};