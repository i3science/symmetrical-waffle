import _ from 'lodash';
import mongoose from 'mongoose';
let User = mongoose.model('User');

class UserService {
    /**
     * Retrieve zero or more users that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    list(opts) {
        return User
            .find(opts || {})
            .exec();
    }

    /**
     * Retrieve zero or one users that match the given options. In the
     * event that more than one user matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    findOne(opts) {
        return User
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new user entity.
     * @param user The representation of the user to persist
     */
    create(user) {
        return user.save();
    }

    /**
     * Update an existing user entity.
     * @param user The representation of the user to update
     */
    update(user, modified) {
        _.extend(user, modified);
        return user.savePromise();
    }

    /**
     * Delete the user represented by the given entity or identifier.
     * @param user A JSON representation or identifier
     */
    delete(user) {
        return user.removePromise();
    }
}

export default new UserService();