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
    list(opts) {
        return History
            .find(opts || {})
            .populate('created_by')
            .populateHistoryTarget()
            .exec();
    }
};