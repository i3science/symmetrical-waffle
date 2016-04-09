'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * A Task is an item which may be assigned to a user and marked as done.
 */
var Task = new Schema({
    element: {
        type: Schema.Types.ObjectId,
        ref: 'CampaignElement',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    filename: {
        type: String,
        required: false
    },
    mime: {
        type: String,
        required: false
    }
});

Task.plugin(require('./_tenancy.js')());
Task.plugin(require('./_auditing.js'));
mongoose.model('Task', Task);
module.exports = Task;