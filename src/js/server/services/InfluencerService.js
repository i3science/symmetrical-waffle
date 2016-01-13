import mongoose from 'mongoose';
import _ from 'lodash';
let Influencer = mongoose.model('Influencer');

/**
 * The InfluencerService is responsible for persisting and retrieving
 * information to and from the underlying datastore in a consistent manner.
 */
class InfluencerService {
    /**
     * Retrieve zero or more influencers that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    list(opts) {
        return Influencer
            .find(opts || {})
            .exec();
    }

    /**
     * Retrieve zero or one influencers that match the given options. In the
     * event that more than one influencer matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    findOne(opts) {
        return Influencer
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new influencer entity.
     * @param influencer The representation of the influencer to persist
     */
    create(influencer) {
        influencer = new Influencer(influencer);
        return influencer.savePromise();
    }

    /**
     * Update an existing influencer entity.
     * @param influencer The representation of the influencer to update
     */
    update(influencer, modified) {
        _.extend(influencer, modified);
        return influencer.savePromise();
    }

    /**
     * Delete the influencer represented by the given entity or identifier.
     * @param influencer A JSON representation or identifier
     */
    delete(influencer) {
        return influencer.removePromise();
    }
}

export default new InfluencerService();