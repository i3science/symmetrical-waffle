import userService from '../services/UserService';

class UserController {

    list() {

    }
    find() {

    }
    getCurrentUser(req, res) {
        return res.json(req.user);
    }
    userById(req, res, next, id) {
        return userService
            .findOne({_id:id})
            .then(function(user){
                return res.jsonp(user);
            })
            .fail(function(){
                return res.status(400).send({
                    message: 'An error occurred'
                });
            });
    }
    create() {

    }
    update() {

    }
    delete() {

    }

    requiresLogin(req, res, next) {
        // if (!req.isAuthenticated()) {
        //  return res.status(401).send({
        //      message: 'User is not logged in'
        //  });
        // }
        next();
    }
}

export default new UserController();