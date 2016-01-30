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
     * A reference to the agency that is organizing the campaign.
     */
    agency: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: 'Organizing agency is required'
    },
    /**
     * The client for whom the campaign is intended. For example, Ford, Crest.
     */
    client: {
        type: String,
        required: 'Project client is required'
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
    project_live: Date,
    project_end: Date,
    /**
     * Arbitrary user-generated checkpoints.
     */
    checkpoints: [{
        name: String,
        date: Date
    }],
    /**
     * The influencers who have been assigned to the project.
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
     * The approval status of the project.
     */
    approved: Boolean,
    approved_date: Date,

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



mongoose.model('Project', Project);
module.exports = Project;