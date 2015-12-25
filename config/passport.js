'use strict';

/**
* Module dependencies.
*/
var passport = require('passport'),
User = require('mongoose').model('User'),
path = require('path'),
config = require('./config');

/**
* Module init function.
*/
module.exports = function() {
    // Serialize sessions
    passport.serializeUser(function(user, done) {
        console.log('Serializing user: ', user.id);
        done(null, user.id);
    });

    // Deserialize sessions
    passport.deserializeUser(function(id, done) {
        console.log('ID: ', id);
        User
            .findOne({ _id: id }, '-salt -password')
            .exec(function(err, user) {
                done(err, user);
            });
    });

    // Initialize strategies
    config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
        require(path.resolve(strategy))();
    });
};