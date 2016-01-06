import userController  from '../../controllers/UserController';
import authenticationController from '../../controllers/AuthenticationController';

module.exports = function(app) {
    app.route('/api/users')
        .get(authenticationController.hasRole(['organizer']), userController.list)
        .post(authenticationController.hasRole(['organizer']), userController.create);
    app.route('/api/users/me')
        .get(authenticationController.isLoggedIn, userController.getCurrentUser);
    app.route('/api/users/:userId')
        .get(authenticationController.hasRole(['organizer','client']), userController.find)
        .put(authenticationController.hasRole(['organizer']), userController.update)
        .delete(authenticationController.hasRole(['organizer']), userController.delete);
    app.param('userId', userController.find);
};