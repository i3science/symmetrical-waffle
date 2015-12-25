import authenticationController from '../controllers/AuthenticationController';
import userController from '../controllers/UserController';

module.exports = function(app) {
	app.route('/auth/register').post(authenticationController.register);
	app.route('/auth/signin').post(authenticationController.signin);
	app.route('/auth/signout').get(authenticationController.signout);

	app.param('userId', userController.userById);
};