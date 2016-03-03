import representativeController  from '../../controllers/RepresentativeController';
import authenticationController from '../../controllers/AuthenticationController';

module.exports = function(app) {
    app.route('/api/representatives')
        .get(authenticationController.hasRole(['organizer','representative']), representativeController.list)
        .post(authenticationController.hasRole(['organizer','representative']), representativeController.create);
    app.route('/api/representatives/:representativeId')
        .get(authenticationController.hasRole(['organizer','representative']), representativeController.read)
        .put(authenticationController.hasRole(['organizer']), representativeController.update)
        .delete(authenticationController.hasRole(['organizer']), representativeController.delete);
    app.route('/api/representatives/:representativeId/send')
        .get(authenticationController.hasRole(['organizer']), representativeController.send);
    app.param('representativeId', representativeController.findById);
};