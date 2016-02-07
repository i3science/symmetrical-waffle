import listService from '../services/ListService.js';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The ListController is responsible for interpreting client requests and
 * formatting a response back to the client, often delegating to an
 * ListService instance.
 */
export default class ListController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    static list(req, res) {
        return listService
            .list({})
            .then((lists) => {
                return res.json(lists);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the list indicated by the listId request parameter.
     */
    static read(req, res) {
        return res.json(req.list);
    }
    /**
     * Creates a new list account with the given information.
     */
    static create(req, res) {
        return listService
            .create(req.body)
            .spread((list) => {
                return res.status(201).send({ id: list._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing list account with the given modifications.
     */
    static update(req, res) {
        return listService
            .update(req.list, req.body)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing list account.
     */
    static delete(req, res) {
        return listService
            .remove(req.list)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * List middleware
     */
    static findById(req, res, next, id) {
        listService
            .findOne({ _id: id })
            .then((list) => {
                req.list = list;
                return next();
            })
            .fail((err) => {
                return next(err);
            });
    }
}