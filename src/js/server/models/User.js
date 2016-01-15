'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

/**
 * The User schema represents the common attributes of all actors that interact
 * with the application, including security and personal attributes, as well
 * as primary auditing information.
 */
var User = new Schema({
  name: {
    first: String,
    last: String
  },
  email: {
    type: String,
    sparse: true,
    unique: true,
    trim: true,
    required: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  salt: String,
  passwordHash: String,
  passwordResetToken: {
    id: String,
    expires: Date
  },
  roles: [String],
  active: {
    type: Boolean,
    default: true
  },

  language: {
    type: String,
    default: 'en_CA'
  },
  settings: {},

  // Immediately available auditing information
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
},
{ collection : 'users', discriminatorKey : '_type' });

var UserModel = mongoose.model('User', User);

/*
 * Check for unique email address
 */
UserModel.schema.path('email').validate(function(value, respond){
  mongoose.models['User']
    .findOne({email: value}, function(err, user){
      if (!user) {
        respond(true);
      } else {
        respond(false);
      }
    });
}, 'Email address must be unique');

User.virtual('password')
  .get(function(){
    return this._password;
  })
  .set(function(value){
    this._password = value;
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = crypto.pbkdf2Sync(this._password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  });

// User.virtual('passwordConfirmation')
//   .get(function() {
//     return this._passwordConfirmation;
//   })
//   .set(function(value){
//     this._passwordConfirmation = value;
//   });

/*
 * Validate new password
 */
// UserModel.schema.path('passwordHash').validate(function(value){
//   if (this._password || this._passwordConfirmation) {
//     if (value.length < 8) {
//       this.invalidate('password', 'Must be at least 8 characters');
//     }
//     if (this._password !== this._passwordConfirmation) {
//       this.invalidate('passwordConfirmation', 'Password and confirmation must match');
//     }
//   }

//   if (this.isNew && !this._password) {
//     this.invalidate('password', 'A password is required');
//   }
// }, null);

/**
 * Hash the given salt and password
 */
User.methods.hashPassword = function (salt, password) {
  return crypto.pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64).toString('base64');
};

/**
 * Verifies password for a user
 */
User.methods.authenticate = function (password) {
  return this.passwordHash === this.hashPassword(this.salt, password);
};

module.exports = User;