import mongoose from 'mongoose';
import _ from 'lodash';
require('../utils/history_populate.js')(mongoose);
let History = mongoose.model('History');

/**
 * The HistoryService is responsible for retrieving auditing information from
 * the datastore for a given entity.
 */
export default class HistoryService {
    /**
     * Retrieve a list of audit events for the given entity type and id.
     * @param type The type of entity history is being requested for
     * @param id The id of the entity history is being requested for
     * @param children Whether or not to return history for children of the
     *         entity as well
     */
    static list(type, id, children) {
        return History
            .find({
                'eventable.type': type,
                'eventable.id': id
            })
            .populate('created_by')
            .populateHistoryTarget()
            .exec();
    }
}