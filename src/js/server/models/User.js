'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  uuid = require('node-uuid'),
  moment = require('moment');

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


/*
 * Check for unique email address
 */
User.path('email').validate(function(value, respond){
  if (!this.isNew) {
    respond(true);
  }
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
    if (this.password.startsWith('*')) {
      this.passwordHash = this._password;
      return;
    }
    this.salt = crypto.randomBytes(16).toString('base64');
    this.passwordHash = this.hashPassword(this._password);
  });

User.virtual('passwordConfirmation')
  .get(function() {
    return this._passwordConfirmation;
  })
  .set(function(value){
    this._passwordConfirmation = value;
  });

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
User.methods.hashPassword = function (password) {
  return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
};

/**
 * Verifies password for a user
 */
User.methods.authenticate = function (password) {
  if (process.env.NODE_ENV !== 'production' && this.passwordHash.startsWith('*')) {
    return this.passwordHash === password;
  }
  return this.passwordHash === this.hashPassword(password);
};

/**
 * Generates a new password reset token
 */
User.methods.createPasswordResetToken = function () {
  if (this.passwordResetToken.expires
      && moment(this.passwordResetToken.expires).isAfter(moment())) {
    return false;
  }

  this.passwordResetToken.id = uuid.v4();
  this.passwordResetToken.expires = moment().add(24, 'hours');
  return true;
};

mongoose.model('User', User);
module.exports = User;