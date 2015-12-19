class UserController {

    list() {

    }
    find() {

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