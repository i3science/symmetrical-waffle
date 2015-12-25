'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function (password) {
  return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
  name: {
    first: {
      type: String,
      validate: [validateLocalStrategyProperty, 'Please fill in first name']
    },
    last: {
      type: String,
      validate: [validateLocalStrategyProperty, 'Please fill in last name']
    }
  },
  email: {
    type: String,
    sparse: true,
    unique: true,
    trim: true,
    required: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  salt: {
    type: String
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
  // provider: {
  //   type: String,
  //   required: 'Provider is required'
  // },
  // providerData: {},
  // additionalProvidersData: {},

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


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  this.updated = new Date();

  if (this.isNew) {
    // only set password and salt for new records
    if (this.password && this.password.length > 6) {
      this.salt = crypto.randomBytes(16).toString('base64');
      this.password = this.hashPassword(this.password);
    }
  }
  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return password;
  }
};

/**
 * Verifies password for a user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

mongoose.model('User', UserSchema);
module.exports = UserSchema;