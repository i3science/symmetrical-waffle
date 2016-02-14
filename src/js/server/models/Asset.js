'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * The Asset represents a typically uploaded file or resource which resides
 * within a project.
 */
var Asset = new Schema({
    name: {
        type: String,
        required: true
    },
    mime: {
        type: String
    }
});

Asset.plugin(require('./_tenancy.js'));
Asset.plugin(require('./_auditing.js'));
mongoose.model('Asset', Asset);
module.exports = Asset;