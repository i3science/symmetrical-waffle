import influencerController  from '../controllers/InfluencerController';
import userController from '../controllers/UserController';

module.exports = function(app) {
    app.route('/api/influencers')
        .get(userController.requiresLogin, influencerController.list)
        .post(userController.requiresLogin, influencerController.create);
    app.route('/api/influencer/:influencerId')
        .get(userController.requiresLogin, influencerController.find)
        .put(userController.requiresLogin, influencerController.update)
        .delete(userController.requiresLogin, influencerController.delete);
    app.param('influencerId', influencerController.find);
};