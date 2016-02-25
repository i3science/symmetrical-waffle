import mongoose from 'mongoose';
require('../utils/history_populate.js')(mongoose);
let History = mongoose.model('History');

/**
 * The HistoryService is responsible for retrieving auditing information from
 * the datastore for a given entity.
 */
export default {
    /**
     * Retrieve a list of audit events for the given entity type and id.
     * @param opts
     */
    list(opts, sort) {
        return History
            .find(opts || {})
            .sort(sort || { created_at: -1 })
            .populate('created_by')
            .populateHistoryTarget()
            .exec();
    }
};