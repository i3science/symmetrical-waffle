import authenticationController from '../controllers/AuthenticationController';
import userController from '../controllers/UserController';

module.exports = function(app) {
	app.route('/auth/register').post(authenticationController.register);
	app.route('/auth/signin').post(authenticationController.signin);
	app.route('/auth/signout').get(authenticationController.signout);
    app.route('/auth/forgot-password').post(authenticationController.sendPasswordReset);
    app.route('/auth/reset-password').post(authenticationController.resetPassword);

	app.param('userId', userController.findById);
};