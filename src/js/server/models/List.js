'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * The List represents a named collection of influencers.
 */
var List = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: 'Organization id is required'
    },
    name: {
        type: String,
        required: true
    },
    influencers: [{
        type: Schema.Types.ObjectId,
        ref: 'Influencer'
    }],

    // Immediately available auditing information
    active: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        ref: 'User'
    },
    updated: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        ref: 'User'
    }
});



mongoose.model('List', List);
module.exports = List;