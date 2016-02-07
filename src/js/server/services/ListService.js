import mongoose from 'mongoose';
import _ from 'lodash';
let List = mongoose.model('List');

/**
 * The ListService is responsible for persisting and retrieving information to
 * and from the underlying datastore in a consistent manner.
 */
export default class ListService {
    /**
     * Retrieve zero or more lists that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static list(opts) {
        opts = opts || {};
        return List
            .find(opts)
            .exec();
    }

    /**
     * Retrieve zero or one lists that match the given options. In the
     * event that more than one list matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static findOne(opts) {
        return List
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new list entity.
     * @param list The representation of the list to persist
     */
    static create(list) {
        list = new List(list);
        return list.savePromise();
    }

    /**
     * Update an existing list entity.
     * @param list The representation of the list to update
     */
    static update(list, modified) {
        _.extend(list, modified);
        return list.savePromise();
    }

    /**
     * Delete the list represented by the given entity or identifier.
     * @param list A JSON representation or identifier
     */
    delete(list) {
        return list.removePromise();
    }
}