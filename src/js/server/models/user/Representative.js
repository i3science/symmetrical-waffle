'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./../User');
require('mongoose-schema-extend'); // This should not need to be here, but seeding breaks without it :@

/**
 * The Representative represents an actor in the employ of and working on behalf
 * of a client.
 */
var Representative = User.extend({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    roles: {
        type: Array,
        default: ['rep']
    }
});

function findRepresentatives(next) {
    this.where({roles: 'rep'});
    next();
}

Representative.pre('find', findRepresentatives);
Representative.pre('findOne', findRepresentatives);
Representative.pre('findOneAndUpdate', findRepresentatives);
Representative.pre('count', findRepresentatives);

// Auditing plugin provided by User superclass
mongoose.model('Representative', Representative);
module.exports = Representative;