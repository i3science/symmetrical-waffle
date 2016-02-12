'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * A Comment on a given entity
 */
var Comment = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    target_id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    target_type: {
        type: String,
        required: true
    }
});

Comment.plugin(require('./_auditing.js'));
mongoose.model('Comment', Comment);
module.exports = Comment;