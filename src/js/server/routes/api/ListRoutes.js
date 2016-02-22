import listController from '../../controllers/ListController';
import authenticationController from '../../controllers/AuthenticationController';

module.exports = function(app) {
    app.route('/api/lists')
        .get(authenticationController.hasRole(['organizer','client']), listController.list)
        .post(authenticationController.hasRole(['organizer','client']), listController.create);
    app.route('/api/lists/:listId')
        .get(authenticationController.hasRole(['organizer','client']), listController.read)
        .put(authenticationController.hasRole(['organizer']), listController.update)
        .delete(authenticationController.hasRole(['organizer']), listController.delete);
    app.param('listId', listController.findById);
};