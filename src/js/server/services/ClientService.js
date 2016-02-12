import mongoose from 'mongoose';
import _ from 'lodash';
let Client = mongoose.model('Client');

/**
 * The ClientService is responsible for persisting and retrieving
 * information to and from the underlying datastore in a consistent manner.
 */
export default class ClientService {
    /**
     * Retrieve zero or more clients that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static list(opts) {
        opts = opts || {};
        return Client
            .find(opts)
            .exec();
    }

    /**
     * Retrieve zero or one clients that match the given options. In the
     * event that more than one client matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static findOne(opts) {
        return Client
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new client entity.
     * @param client The representation of the client to persist
     */
    static create(client) {
        client = new Client(client);
        return client.savePromise();
    }

    /**
     * Update an existing client entity.
     * @param client The representation of the client to update
     */
    static update(client, modified) {
        _.extend(client, modified);
        return client.savePromise();
    }

    /**
     * Delete the client represented by the given entity or identifier.
     * @param client A JSON representation or identifier
     */
    static delete(client) {
        return client.removePromise();
    }
}