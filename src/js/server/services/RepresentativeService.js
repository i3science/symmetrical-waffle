import Q from 'q';
import mongoose from 'mongoose';
import base_service from './base_service';
let Representative = mongoose.model('Representative');
let Client = mongoose.model('Client');

/**
 * The RepresentativeService is responsible for persisting and retrieving
 * information to and from the underlying datastore in a consistent manner.
 */
export default base_service(Representative, {
    list(opts) {
        opts = opts || {};
        return Representative
            .find(opts)
            .populate('client', 'name')
            .exec();
    },

    /**
     * If we were supplied with an invalid client object id, then we want to
     * create a new client and give it the name passed, otherwise we can just
     * keep the valid object id around.
     */
    normalizeClient(client) {
        if (client && client._id) {
            return Q(client._id);
        }
        if (client.match(/^[a-fA-F0-9]{24}$/)) {
            return Q(client);
        }

        let c = new Client({
            name: client
        });
        return c.savePromise()
            .spread((client) => {
                return client._id;
            });
    },

    /**
     * Create a new entity model and persist it to the datastore.
     * @param entity The representation of the entity to persist
     */
    create(entity) {
        return this.normalizeClient(entity.client)
            .then((client_id) => {
                entity.client = client_id;
                let rep = new Representative(entity);
                return rep.savePromise();
            });
    },

    update(entity, modified) {
        Object.keys(modified).forEach((key) => {
            entity[key] = modified[key];
        });
        return this.normalizeClient(modified.client || entity.client)
            .then((client_id) => {
                entity.client = client_id;
                return entity.savePromise();
            });
    }
});