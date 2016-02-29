import config from '../../../../config/config';
import userController from '../controllers/UserController';
import authenticationController from '../controllers/AuthenticationController';

module.exports = function(app) {
    app.route('/users/:userId')
        .put(authenticationController.isLoggedIn, config.uploader.single('file'), userController.update);

    app.param('userId', userController.findById);
};