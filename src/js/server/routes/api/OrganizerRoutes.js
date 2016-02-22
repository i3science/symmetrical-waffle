import organizerController  from '../../controllers/OrganizerController';
import authenticationController from '../../controllers/AuthenticationController';

module.exports = function(app) {
    app.route('/api/organizers')
        .get(authenticationController.hasRole(['organizer','client']), organizerController.list)
        .post(authenticationController.hasRole(['organizer','client']), organizerController.create);
    app.route('/api/organizers/:organizerId')
        .get(authenticationController.hasRole(['organizer','client']), organizerController.read)
        .put(authenticationController.hasRole(['organizer']), organizerController.update)
        .delete(authenticationController.hasRole(['organizer']), organizerController.delete);
    app.param('organizerId', organizerController.findById);
};