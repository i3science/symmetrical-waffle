'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
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
        ref: 'Client'
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
     * The intended effects of the campaign.
     */
    goals: {
        engagement: Boolean,
        reach: Boolean,
        general: Boolean
    },
    /**
     * The number of influencers required in specific categories.
     */
    required_influencers: {
        bloggers: Number,
        photo_bloggers: Number,
        vloggers: Number,
        amplifiers: Number
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
        influencer_approved: Boolean
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
});

Project.plugin(require('./_tenancy.js'));
Project.plugin(require('./_auditing.js'));
mongoose.model('Project', Project);
module.exports = Project;