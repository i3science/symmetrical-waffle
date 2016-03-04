import mongoose from 'mongoose';
import base_service from './base_service';
let Representative = mongoose.model('Representative');

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
    }
});