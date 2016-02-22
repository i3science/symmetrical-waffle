'use strict';

/**
 * Module dependencies.
 */
var context = require('request-context'),
    mongoose = require('mongoose'),
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

/**
 * Additional security constraints to prevent clients/influencers from seeing
 * clients that don't apply to them
 */
var limits = function(next) {
    var user = context.get('request:currentUser');
    if (user.roles.indexOf('admin') > -1 || user.roles.indexOf('organizer') > -1) {
        next();
    }
    else if (user.roles.indexOf('rep') > -1) {
        this.where({'_id': user.client});
        next();
    }
    else if (user.roles.indexOf('influencer') > -1) {
        // Only show clients for whom the influencer is assigned to a campaign
        var self = this;
        mongoose.models['Project']
            .find({'influencers.influencer':user._id}, function(err, projects){
                var clients = projects.map(function(project){
                    return project.client._id || project.client;
                });
                self.where({'_id': {$in: clients}});
                return next();
            });
    }
    else {
        this.where({'organizer':null});
        next();
    }
};

Client.plugin(require('./_tenancy.js')(limits));
Client.plugin(require('./_auditing.js'));
mongoose.model('Client', Client);
module.exports = Client;