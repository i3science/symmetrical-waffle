'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = require('./User');
require('mongoose-schema-extend'); // This should not need to be here, but seeding breaks without it :@

/**
 * The Influencer represents an actor that exerts their influence within a
 * particular segment of a market.
 */
var Influencer = User.extend({
    amplifier: Boolean,
    hasImage: Boolean,
    reach: [{
        medium: String,
        value: Number
    }],
    mediaKit: [{
        name: String,
        price: Number
    }],
    verticals: [String],
    audience: {
        sex: String,
        language: String,
        age: {
            start: Number,
            end: Number
        },
        married: Boolean,
        kids: [String],
        country: String,
        region: String,
        city: String,
        residence: String,
        householdIncome: Number,
        pets: [String],
        ethnicity: String
    },
    personal: {
        sex: String,
        language: String,
        age: Number,
        married: String,
        kids: [String],
        country: String,
        region: String,
        city: String,
        residence: String,
        householdIncome: Number,
        pets: [String],
        ethnicity: String,
        employment: String
    }
});



mongoose.model('Influencer', Influencer);
module.exports = Influencer;