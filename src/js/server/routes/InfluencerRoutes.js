import influencerController  from '../controllers/InfluencerController';
import authenticationController from '../controllers/AuthenticationController';

module.exports = function(app) {
    app.route('/api/influencers')
        .get(authenticationController.hasRole(['organizer','client']), influencerController.list)
        .post(authenticationController.hasRole(['organizer','client']), influencerController.create);
    app.route('/api/influencer/:influencerId')
        .get(authenticationController.hasRole(['organizer','client']), influencerController.find)
        .put(authenticationController.hasRole(['organizer']), influencerController.update)
        .delete(authenticationController.hasRole(['organizer']), influencerController.delete);
    app.param('influencerId', influencerController.find);
};