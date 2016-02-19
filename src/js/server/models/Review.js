'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * The Review represents a rating and comment for an influencer with regard to
 * their performance on a specific project.
 */
var Review = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: 'Organization id is required'
    },
    influencer: {
        type: Schema.Types.ObjectId,
        ref: 'Influencer'
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

Review.plugin(require('./_tenancy.js'));
Review.plugin(require('./_auditing.js'));
mongoose.model('Review', Review);
module.exports = Review;