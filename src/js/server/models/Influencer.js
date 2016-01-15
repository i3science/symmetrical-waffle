'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = require('./User');

/**
 * The Influencer represents an actor that exerts their influence within a
 * particular segment of a market.
 */
var Influencer = User.extend({
    amplifier: Boolean,
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
        married: Boolean,
        kids: [Number],
        country: String,
        region: String,
        city: String,
        residence: String,
        householdIncome: Number,
        pets: [String],
        ethnicity: String
    }
});



mongoose.model('Influencer', Influencer);
module.exports = Influencer;