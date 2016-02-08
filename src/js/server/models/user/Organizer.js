'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = require('./../User');
require('mongoose-schema-extend'); // This should not need to be here, but seeding breaks without it :@

/**
 * The Organizer represents an actor that creates and organizes client campaigns
 * on behalf of their employing organization.
 */
var Organizer = User.extend({
    roles: {
        type: Array,
        default: ['organizer']
    }
});

function findOrganizers(next) {
    this.where({roles: 'organizer'});
    next();
}

Organizer.pre('find', findOrganizers);
Organizer.pre('findOne', findOrganizers);
Organizer.pre('findOneAndUpdate', findOrganizers);
Organizer.pre('count', findOrganizers);

// Auditing plugin provided by User superclass
mongoose.model('Organizer', Organizer);
module.exports = Organizer;