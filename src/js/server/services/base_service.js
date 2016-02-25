import _ from 'lodash';

/**
 * A Service is merely a collection of functions whose sole purpose is to
 * abstract persistence operations. Abstracting persistence operations permits
 * the application to more easily utilise other datastores or support hybrid
 * data storage systems.
 *
 * This function accepts the expected model that will be used to communicate
 * with Mongoose, and returns a the basic set of service functions.
 * @param {mongoose.Model} model - The model that the service should use to
 *         communicate with the underlying datastore.
 * @param {Object} extensions - An object containing one or more overriding or
 *         extending methods to add to the newly-created service.
 * @returns {Object} The service implementation including extensions.
 */
export default (model, extensions) => {
    return _.extend({

        /**
         * Retrieve zero or more entities that match the given options. There is
         * no guarantee of any sort of natural ordering.
         * @param opts A dictionary of search options
         * @todo Document available options
         */
        list(opts) {
            opts = opts || {};
            return model
                .find(opts)
                .exec();
        },

        /**
         * Retrieve zero or one entities that match the given options. In the
         * event that more than one entity matches, the first one found will be
         * returned. There is no guarantee of any sort of natural ordering.
         * @param opts A dictionary of search options
         * @todo Document available options
         */
        findOne(opts) {
            return model
                .findOne(opts || {})
                .exec();
        },

        /**
         * Create a new entity model and persist it to the datastore.
         * @param entity The representation of the entity to persist
         */
        create(entity) {
            return new model(entity)
                .savePromise();
        },

        /**
         * Update an existing entity.
         * @param entity The representation of the entity to update
         */
        update(entity, modified) {
            Object.keys(modified).forEach((key) => {
                entity[key] = modified[key];
            });
            return entity.savePromise();
        },

        /**
         * Delete the entity represented by the given entity or identifier.
         * @param entity The representation of the entity to delete
         */
        delete(entity) {
            return entity.removePromise();
        }
    }, extensions);
};