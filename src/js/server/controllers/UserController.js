import userService from '../services/UserService';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The UserController is responsible for interpreting client requests and
 * formatting a response back to the client, often delegating to a UserService
 * instance.
 */
class UserController {

    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    list(req, res) {
        return userService
            .list(req.query || {})
            .then(function(users){
                return res.jsonp(users);
            })
            .fail(ErrorUtils.failureHandler());
    }
    /**
     * Retrieve the user identified by the userId request parameter.
     */
    read(req, res) {
        return res.json(req.user);
    }
    /**
     * Retrieve the currently logged in user.
     */
    me(req, res) {
        return res.json(req.loggedInUser);
    }
    /**
     * Creates a new user account with the given information.
     */
    create(req, res) {
        delete req.body.password;
        delete req.body.passwordConfirmation;
        delete req.body.passwordResetToken;
        
        return userService
            .create(req.body)
            .spread(function(){
                return res.status(201).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing user account with the given modifications.
     */
    update(req, res) {
        delete req.body.password;
        delete req.body.passwordConfirmation;
        delete req.body.passwordResetToken;
        
        return userService
            .update(req.user, req.body)
            .spread(function(){
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing user account.
     */
    delete(req, res) {
        return userService
            .remove(req.user)
            .spread(function(){
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * User middleware
     */
    findById(req, res, next, id) {
        userService
            .findOne({ _id: id })
            .then(function(user){
                req.user = user;
                return next();
            })
            .fail(function(err){
                return next(err);
            });
    }
}

export default new UserController();