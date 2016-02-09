import mongoose from 'mongoose';
import _ from 'lodash';
import mailService from './MailService';
let Organizer = mongoose.model('Organizer');

/**
 * The OrganizerService is responsible for persisting and retrieving
 * information to and from the underlying datastore in a consistent manner.
 */
export default class OrganizerService {
    /**
     * Retrieve zero or more organizers that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static list(opts) {
        opts = opts || {};
        return Organizer
            .find(opts)
            .exec();
    }

    /**
     * Retrieve zero or one organizers that match the given options. In the
     * event that more than one organizer matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static findOne(opts) {
        return Organizer
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new organizer entity.
     * @param organizer The representation of the organizer to persist
     */
    static create(organizer) {
        organizer = new Organizer(organizer);
        return organizer.savePromise();
    }

    /**
     * Update an existing organizer entity.
     * @param organizer The representation of the organizer to update
     */
    static update(organizer, modified) {
        _.extend(organizer, modified);
        return organizer.savePromise();
    }

    /**
     * Delete the organizer represented by the given entity or identifier.
     * @param organizer A JSON representation or identifier
     */
    static delete(organizer) {
        return organizer.removePromise();
    }
}