'use strict';

/**
 * Module dependencies.
 */
var context = require('request-context'),
    mongoose = require('mongoose'),
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

/**
 * Additional security constraints to prevent influencers from seeing
 * elements that don't apply to them
 */
var limits = function(next) {
    var user = context.get('request:currentUser');
    if (user.roles.indexOf('influencer') > -1) {
        this.where({'assignee':user._id});
    }
    next();
};
CampaignElement.pre('find', limits);
CampaignElement.pre('findOne', limits);
CampaignElement.pre('findOneAndUpdate', limits);
CampaignElement.pre('count', limits);

CampaignElement.plugin(require('./_auditing.js'));
mongoose.model('CampaignElement', CampaignElement);
module.exports = CampaignElement;