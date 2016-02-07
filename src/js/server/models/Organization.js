'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * An Organization is any firm, enterprise, or conglomerate which comprises one
 * or more actors and resources.
 */
var Organization = new Schema({
    name: String,
    hostnames: [String],
    defaultLanguage: String,
    settings: {}
});

Organization.plugin(require('./_auditing.js'));
mongoose.model('Organization', Organization);
module.exports = Organization;