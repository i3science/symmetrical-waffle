'use strict';

/**
 * Module dependencies.
 */
var context = require('request-context'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * The Project represents a media campaign which involves influencers, on behalf
 * of a client.
 */
var Project = new Schema({
    /**
     * The client for whom the campaign is intended. For example, Ford, Crest.
     */
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    /**
     * The name of the campaign.
     */
    name: {
        type: String,
        required: 'Project name is required'
    },
    /**
     * A brief description of the purpose of the campaign.
     */
    brief: String,
    /**
     * The type of campaign.
     */
    projectType: String,
    /**
     * The intended effects of the campaign.
     */
    goals: {
        engagement: {
            type: Boolean,
            default: false
        },
        reach: {
            type: Boolean,
            default: false
        },
        general: {
            type: Boolean,
            default: false
        }
    },
    /**
     * The number of influencers required in specific categories.
     */
    required_influencers: {
        type: {
            bloggers: Number,
            photo_bloggers: Number,
            vloggers: Number,
            amplifiers: Number
        }
    },
    /**
     * The number of impressions required for campaign success.
     */
    required_impressions: Number,
    /**
     * The maximum budget which may be spent on the campaign.
     */
    budget: Number,
    /**
     * Campaign-significant dates.
     */
    project_start: Date,
    project_live: Date,
    project_end: Date,
    /**
     * Arbitrary user-generated checkpoints.
     */
    checkpoints_start: [{
        name: String,
        date: Date
    }],
    checkpoints_live: [{
        name: String,
        date: Date
    }],
    checkpoints_end: [{
        name: String,
        date: Date
    }],
    /**
     * The individual influencers who have been assigned to the project.
     */
    influencers: [{
        influencer: {
            type: Schema.Types.ObjectId,
            ref: 'Influencer'
        },
        client_approved: Boolean,
        influencer_approved: Boolean,
        influencer_notes: String
    }],
    /**
     * The lists of influencers who have been assigned to the project.
     */
    lists: [String],
    /**
     * The approval status of the project.
     */
    approved: Boolean,
    approved_date: Date,

    // Immediately available auditing information
    active: {
        type: Boolean,
        default: true
    }
}, { strict: false });
/*
 * Ensure we've been given a required number of influencers
 */
Project.path('required_influencers').validate(function(value, respond){
    if (Object.keys(value).length === 0) {
        respond(false);
    }
    respond(true);
}, 'Number of influencers required');

/**
 * Additional security constraints to prevent clients/influencers from seeing
 * campaigns that don't belong to them.
 */
var limits = function(next) {
    var user = context.get('request:currentUser');
    if (user.roles.indexOf('admin') > -1 || user.roles.indexOf('organizer') > -1) {
        return next();
    }
    if (user.roles.indexOf('influencer') > -1) {
        this.where({'influencers': { $elemMatch: { 'influencer': user._id, 'influencer_approved': { $ne: false }}}});
        return next();
    }
    if (user.roles.indexOf('rep') > -1) {
        this.where({'client':user.client._id||user.client});
        return next();
    }
    this.where({'organizer':null});
    return next();
};

Project.plugin(require('./_tenancy.js')(limits));
Project.plugin(require('./_auditing.js'));
mongoose.model('Project', Project);
module.exports = Project;