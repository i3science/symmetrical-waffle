import campaignElementService from '../services/CampaignElementService.js';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The CampaignElementController is responsible for interpreting client requests
 * and formatting a response back to the client, often delegating to an
 * CampaignElementService instance.
 */
export default class CampaignElementController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    static list(req, res) {
        return campaignElementService
            .list({ project: req.project._id })
            .then((elements) => {
                return res.json(elements);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the element indicated by the elementId request parameter.
     */
    static read(req, res) {
        return res.json(req.element);
    }
    /**
     * Creates a new element account with the given information.
     */
    static create(req, res) {
        return campaignElementService
            .create(req.body)
            .spread((element) => {
                return res.status(201).send({ id: element._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing element account with the given modifications.
     */
    static update(req, res) {
        return campaignElementService
            .update(req.element, req.body)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing element account.
     */
    static delete(req, res) {
        return campaignElementService
            .remove(req.element)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Element middleware
     */
    static findById(req, res, next, id) {
        campaignElementService
            .findOne({ _id: id })
            .then((element) => {
                req.element = element;
                return next();
            })
            .fail((err) => {
                return next(err);
            });
    }
}