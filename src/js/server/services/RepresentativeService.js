import mongoose from 'mongoose';
import _ from 'lodash';
let Representative = mongoose.model('Representative');

/**
 * The RepresentativeService is responsible for persisting and retrieving
 * information to and from the underlying datastore in a consistent manner.
 */
export default class RepresentativeService {
    /**
     * Retrieve zero or more representatives that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static list(opts) {
        opts = opts || {};
        return Representative
            .find(opts)
            .exec();
    }

    /**
     * Retrieve zero or one representatives that match the given options. In the
     * event that more than one representative matches, the first one found will
     * be returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static findOne(opts) {
        return Representative
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new representative entity.
     * @param representative The representation of the representative to persist
     */
    static create(representative) {
        representative = new Representative(representative);
        return representative.savePromise();
    }

    /**
     * Update an existing representative entity.
     * @param representative The representation of the representative to update
     */
    static update(representative, modified) {
        _.extend(representative, modified);
        return representative.savePromise();
    }

    /**
     * Delete the representative represented by the given entity or identifier.
     * @param representative A JSON representation or identifier
     */
    static delete(representative) {
        return representative.removePromise();
    }
}