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
    }
});

List.plugin(require('./_tenancy.js')());
List.plugin(require('./_auditing.js'));
mongoose.model('List', List);
module.exports = List;