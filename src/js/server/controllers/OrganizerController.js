import organizerService from '../services/OrganizerService.js';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The OrganizerController is responsible for interpreting client requests and
 * formatting a response back to the client, often delegating to an
 * OrganizerService instance.
 */
export default class OrganizerController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    static list(req, res) {
        return organizerService
            .list({})
            .then((organizers) => {
                return res.json(organizers);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the organizer indicated by the organizerId request parameter.
     */
    static read(req, res) {
        return res.json(req.organizer);
    }
    /**
     * Creates a new organizer account with the given information.
     */
    static create(req, res) {
        return organizerService
            .create(req.body, req.basePath)
            .spread((organizer) => {
                return res.status(201).send({ id: organizer._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing organizer account with the given modifications.
     */
    static update(req, res) {
        return organizerService
            .update(req.organizer, req.body)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing organizer account.
     */
    static delete(req, res) {
        return organizerService
            .remove(req.organizer)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Organizer middleware
     */
    static findById(req, res, next, id) {
        organizerService
            .findOne({ _id: id })
            .then((organizer) => {
                req.organizer = organizer;
                return next();
            })
            .fail((err) => {
                return next(err);
            });
    }
}