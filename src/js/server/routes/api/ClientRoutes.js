import clientController  from '../../controllers/ClientController';
import authenticationController from '../../controllers/AuthenticationController';

module.exports = function(app) {
    app.route('/api/clients')
        .get(authenticationController.isLoggedIn, clientController.list)
        .post(authenticationController.hasRole(['organizer','client']), clientController.create);
    app.route('/api/clients/:clientId')
        .get(authenticationController.hasRole(['organizer','client']), clientController.read)
        .put(authenticationController.hasRole(['organizer']), clientController.update)
        .delete(authenticationController.hasRole(['organizer']), clientController.delete);
    app.param('clientId', clientController.findById);
};