import influencerService from '../services/InfluencerService.js';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The InfluencerController is responsible for interpreting client requests and
 * formatting a response back to the client, often delegating to an
 * InfluencerService instance.
 */
class InfluencerController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    list(req, res) {
        return influencerService
            .list({})
            .then(function(influencers){
                return res.json(influencers);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the influencer indicated by the influencerId request parameter.
     */
    read(req, res) {
        return res.json(req.influencer);
    }
    /**
     * Creates a new influencer account with the given information.
     */
    create(req, res) {
        return influencerService
            .create(req.body, req.basePath)
            .spread(function(influencer){
                return res.status(201).send({ id: influencer._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing influencer account with the given modifications.
     */
    update(req, res) {
        return influencerService
            .update(req.influencer, req.body)
            .spread(function(){
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing influencer account.
     */
    delete(req, res) {
        return influencerService
            .remove(req.influencer)
            .spread(function(){
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Influencer middleware
     */
    findById(req, res, next, id) {
        influencerService
            .findOne({ _id: id })
            .then(function(influencer){
                req.influencer = influencer;
                return next();
            })
            .fail(function(err){
                return next(err);
            });
    }
}

export default new InfluencerController();