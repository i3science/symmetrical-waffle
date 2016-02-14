import _ from 'lodash';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * A Controller is merely a collection of functions whose sole purpose is to
 * interpret an incoming request and delegate handling according to the
 * requirements of the request.
 *
 * This function requires the service that will be used to perform persistence
 * actions, the name of the request property used to store found entities,
 * and any extensions to add to the controller.
 * @param {Object} service - The service implementation to use when accessing
 *         the underlying data store.
 * @param {String} middleware_name - The name of the request property to use
 *         when storing found entities.
 * @param {Object} extensions - An object containing one or more overriding or
 *         extending methods to add to the newly-created controller.
 * @returns {Object} The controller implementation including extensions.
 */
export default (service, middleware_name, extensions) => {
    return _.extend({
        /**
         * Retrieves zero or more entities that adhere to the given criteria.
         */
        list(req, res) {
            return service
                .list({})
                .then((entities) => {
                    return res.jsonp(entities);
                })
                .fail(ErrorUtils.failureHandler(req, res));
        },
        /**
         * Retrieves the entitiy indicated by the clientId request parameter.
         */
        read(req, res) {
            return res.json(req[middleware_name]);
        },
        /**
         * Creates a new client account with the given information.
         */
        create(req, res) {
            let obj = this.sanitize(req.body);
            return service
                .create(obj)
                .spread((entity) => {
                    return res.status(201).send({ id: entity._id });
                })
                .fail(ErrorUtils.failureHandler(req, res));
        },
        /**
         * Updates an existing client account with the given modifications.
         */
        update(req, res) {
            let obj = this.sanitize(req.body);
            return service
                .update(req[middleware_name], obj)
                .spread(() => {
                    return res.status(204).send();
                })
                .fail(ErrorUtils.failureHandler(req, res));
        },
        /**
         * Delete an existing client account.
         */
        delete(req, res) {
            return service
                .remove(req[middleware_name])
                .spread(() => {
                    return res.status(204).send();
                })
                .fail(ErrorUtils.failureHandler(req, res));
        },

        /**
         * Client middleware
         */
        findById(req, res, next, id) {
            service
                .findOne({ _id: id })
                .then((entity) => {
                    req[middleware_name] = entity;
                    return next();
                })
                .fail((err) => {
                    return next(err);
                });
        },

        /**
         * Perform any sanitization on incoming data. Useful for preventing
         * folks from overriding roles, user auth data, etc.
         */
        sanitize(obj) {
            return obj;
        }
    }, extensions);
};