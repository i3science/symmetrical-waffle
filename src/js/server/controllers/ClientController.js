import clientService from '../services/ClientService.js';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The ClientController is responsible for interpreting client requests and
 * formatting a response back to the client, often delegating to an
 * ClientService instance.
 */
export default class ClientController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    static list(req, res) {
        return clientService
            .list({})
            .then(function(clients){
                return res.json(clients);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the client indicated by the clientId request parameter.
     */
    static read(req, res) {
        return res.json(req.client);
    }
    /**
     * Creates a new client account with the given information.
     */
    static create(req, res) {
        return clientService
            .create(req.body)
            .spread(function(client){
                return res.status(201).send({ id: client._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing client account with the given modifications.
     */
    static update(req, res) {
        return clientService
            .update(req.client, req.body)
            .spread(function(){
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing client account.
     */
    static delete(req, res) {
        return clientService
            .remove(req.client)
            .spread(function(){
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Client middleware
     */
    static findById(req, res, next, id) {
        clientService
            .findOne({ _id: id })
            .then(function(client){
                req.client = client;
                return next();
            })
            .fail(function(err){
                return next(err);
            });
    }
}