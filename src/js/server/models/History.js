'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * The History entity represents a single entity persistence state change. All
 * History records for a given object may be retrieved to produce a timeline of
 * the evolution of the entity as well as who performed those evolutions.
 */
var History = new Schema({
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    action: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    eventable: {
        id: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true
        },
        type: {
            type: String,
            required: true,
            index: true
        }
    },
    changes: [{
        field: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        before: Schema.Types.Mixed,
        after: Schema.Types.Mixed
    }]
}, { strict: false });

mongoose.model('History', History);
module.exports = History;