import representativeService from '../services/RepresentativeService.js';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The RepresentativeController is responsible for interpreting representative requests and
 * formatting a response back to the representative, often delegating to an
 * RepresentativeService instance.
 */
export default class RepresentativeController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    static list(req, res) {
        return representativeService
            .list({})
            .then(function(representatives){
                return res.json(representatives);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the representative indicated by the representativeId request parameter.
     */
    static read(req, res) {
        return res.json(req.representative);
    }
    /**
     * Creates a new representative account with the given information.
     */
    static create(req, res) {
        return representativeService
            .create(req.body)
            .spread(function(representative){
                return res.status(201).send({ id: representative._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing representative account with the given modifications.
     */
    static update(req, res) {
        return representativeService
            .update(req.representative, req.body)
            .spread(function(){
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing representative account.
     */
    static delete(req, res) {
        return representativeService
            .remove(req.representative)
            .spread(function(){
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Representative middleware
     */
    static findById(req, res, next, id) {
        representativeService
            .findOne({ _id: id })
            .then(function(representative){
                req.representative = representative;
                return next();
            })
            .fail(function(err){
                return next(err);
            });
    }
}