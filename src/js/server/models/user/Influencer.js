'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = require('./../User');
require('mongoose-schema-extend'); // This should not need to be here, but seeding breaks without it :@

/**
 * The Influencer represents an actor that exerts their influence within a
 * particular segment of a market.
 */
var Influencer = User.extend({
    amplifier: Boolean,
    hasImage: Boolean,
    channels: {
        facebook: Number,
        twitter: Number,
        pinterest: Number,
        instagram: Number,
        youtube: Number,
        blog: Number,
        googleplus: Number
    },
    mediaKit: [{
        name: String,
        price: Number
    }],
    verticals: [String],
    audience: {
        female: Number,
        male: Number,
        language: String,
        ageFrom: Number,
        ageTo: Number,
        married: Boolean,
        kids: [String],
        country: String,
        state: String,
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
        state: String,
        city: String,
        residence: String,
        householdIncome: Number,
        pets: String,
        ethnicity: String,
        employment: String
    },
    vehicle: {
        year: [String],
        make: [String],
        model: [String]
    },
    mediums: [String],
    availability: [String],
    score: Number,
    bio: String,
    work: [{
        name: String,
        path: String
    }],
    roles: {
        type: Array,
        default: ['influencer']
    }


});

function findInfluencers(next) {
    this.where({roles: 'influencer'});
    next();
}

Influencer.pre('find', findInfluencers);
Influencer.pre('findOne', findInfluencers);
Influencer.pre('findOneAndUpdate', findInfluencers);
Influencer.pre('count', findInfluencers);

// Auditing plugin provided by User superclass
mongoose.model('Influencer', Influencer);
module.exports = Influencer;