import influencerController  from '../../controllers/InfluencerController';
import authenticationController from '../../controllers/AuthenticationController';
import reviewRouter from './ReviewRouter.js';

module.exports = function(app) {
    app.route('/api/influencers')
        .get(authenticationController.hasRole(['organizer','rep']), influencerController.list)
        .post(authenticationController.hasRole(['organizer','rep']), influencerController.create);
    app.route('/api/influencers/:influencerId')
        .get(authenticationController.hasRole(['organizer','rep','influencer']), influencerController.read)
        .put(authenticationController.hasRole(['organizer','influencer']), influencerController.update)
        .delete(authenticationController.hasRole(['organizer']), influencerController.delete);
    app.route('/api/influencers/:influencerId/send')
        .get(authenticationController.hasRole(['organizer','rep']), influencerController.send);
    app.param('influencerId', influencerController.findById);

    app.use('/api/influencers/:influencerId/reviews', reviewRouter());
};