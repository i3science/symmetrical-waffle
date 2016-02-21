'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * The Client represents a firm or corporation for which a campaign is being
 * marketed. The Client has one or more representatives which may access the
 * application on behalf of the Client in order to perform campaign-related
 * tasks.
 */
var Client = new Schema({
    name: {
        type: String,
        required: true
    }
});

Client.plugin(require('./_tenancy.js')());
Client.plugin(require('./_auditing.js'));
mongoose.model('Client', Client);
module.exports = Client;