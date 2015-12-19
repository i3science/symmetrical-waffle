import mongoose from 'mongoose';
let Influencer = mongoose.model('Influencer');

/**
 * The InfluencerService is responsible for persisting and retrieving
 * information to and from the underlying datastore in a consistent manner.
 * @class
 */
class InfluencerService {
    /**
     * Retrieve zero or more influencers that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    list(/*opts*/) {
        return Influencer
            .find({})
            .exec();
    }

    /**
     * Retrieve zero or one influencers that match the given options. In the
     * event that more than one influencer matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    findOne(/*opts*/) {

    }

    /**
     * Persist a new influencer entity.
     * @param influencer The representation of the influencer to persist
     */
    create(influencer) {
        return influencer.save();
    }

    /**
     * Update an existing influencer entity.
     * @param influencer The representation of the influencer to update
     */
    update(/*influencer*/) {

    }

    /**
     * Delete the influencer represented by the given entity or identifier.
     * @param influencer A JSON representation or identifier
     */
    delete(/*influencer*/) {

    }
}

export default new InfluencerService();