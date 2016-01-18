'use strict';

var _ = require('lodash'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  User = mongoose.model('User');

class AuthenticationController {
    /**
     *
     */
    register(/*req, res*/) {}
    /**
     *
     */
    authenticate(/*req, res, next*/) {}
    /**
     *
     */
    signin(req, res, next) {
        passport.authenticate('local', function(err, user/*, info*/){
            if (err) {
                res.status(400).send(err);
                return;
            }

            if (!user) {
                res.status(401).send({ message: 'Unknown user or invalid password' });
                return;
            }

            user.passwordHash = undefined;
            user.salt = undefined;

            req.login(user, function(err){
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                User.findOne({_id:user._id}, '-salt -passwordHash')
                    .exec(function(err, found){
                        // TODO: Log successful authentication in history
                        res.json(found);
                    });
            });
        })(req, res, next);
    }
    /**
     *
     */
    signout(req, res) {
        // TODO: Log signout in history
        req.logout();
        res.redirect('/');
    }
    /**
     *
     */
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            next();
            return;
        }
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    /**
     *
     */
    hasRole(roles) {
        var self = this;

        return function(req, res, next) {
            self.isLoggedIn(req, res, function() {
                if (!_.intersection(req.user.roles, ['admin'].concat(roles)).length) {
                    return res.status(403).send({
                        message: 'User is not authorized'
                    });
                }

                next();
            });
        };
    }
}

export default new AuthenticationController();