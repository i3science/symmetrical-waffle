'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * A Comment on a given entity
 */
var CampaignElement = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'Influencer',
        required: true
    },
    type: {
        type: String,
        enum: ['blog', 'vlog', 'photo', 'amplification'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
});

CampaignElement.plugin(require('./_auditing.js'));
mongoose.model('CampaignElement', CampaignElement);
module.exports = CampaignElement;