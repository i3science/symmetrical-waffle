'use strict';

import Q from 'q';
import _ from 'lodash';
import mongoose from 'mongoose';
import passport from 'passport';
import mailService from '../services/MailService';
let User = mongoose.model('User');

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
                res.status(400).send({ message: 'Unknown user or invalid password' });
                return;
            }

            user.passwordHash = undefined;
            user.salt = undefined;

            req.login(user, function(err){
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                User
                    .findOne({_id:user._id}, '-salt -passwordHash')
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
     * Called when a user enters their email address and requests that a
     * password reset email be sent to them.
     */
    sendPasswordReset(req, res) {
        User
            .findOne({ email: req.body.email })
            .exec()
            .then((user) => {
                if (!user) {
                    console.log('User not found for email: ', req.body.email); // eslint-disable-line no-console
                    throw 202;
                }
                user.createPasswordResetToken();
                return user.savePromise();
            })
            .spread((user) => {
                return mailService.send('reset-password', {
                    from: 'no-reply@smp.com',
                    to: user.email,
                    subject: 'Password Reset Requested'
                }, {
                    link: req.basePath + '/security/reset-password?token='+user.passwordResetToken.id
                });
            })
            .then(() => {
                return res.status(202).send({ message: 'An email has been sent.' });
            })
            .fail((err) => {
                if (err === 202) {
                    return res.status(202).send({ message: 'An email has been sent.' });
                }
                console.error('Error: ', err); // eslint-disable-line no-console
                res.status(400).send(err);
            });
    }
    /**
     * Called when a user has entered and confirmed their new password
     */
    resetPassword(req, res) {
        if (req.body.password !== req.body.passwordConfirmation
                || req.body.password === '') {
            return Q.reject({errors:[]});
        }
        return User
            .find({
                'passwordResetToken.id': req.body.token,
                'passwordResetToken.expires': { $gt: Date.now() }
            })
            .exec()
            .then((users) => {
                if (users.length === 0) {
                    console.log('No user found for reset token'); // eslint-disable-line no-console
                    throw new Error('Token not found');
                }
                if (users.length > 1) {
                    console.error('Duplicate reset token found'); // eslint-disable-line no-console
                    throw new Error('Token not found');
                }
                return users[0];
            })
            .then((user) => {
                user.password = req.body.password;
                user.passwordResetToken.id = null;
                user.passwordResetToken.expires = null;
                return user.savePromise();
            })
            .then(() => {
                return res.status(204).send();
            });
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
                if (!_.intersection(req.loggedInUser.roles, ['admin'].concat(roles)).length) {
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