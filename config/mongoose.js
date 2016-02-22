'use strict';

var config = require('./config'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    path = require('path'),
    mongoose = require('mongoose'),
    Q = require('q'),
    _ = require('lodash');
require('mongoose-moment')(mongoose);

// Connect to Mongo DB
module.exports = mongoose.connect(config.db.uri, config.db.options, function(err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
});
mongoose.connection.on('error', function(err) {
  console.error(chalk.red('MongoDB connection error: ' + err));
  process.exit(-1);
});

// Globbing model files
config.getGlobbedFiles('./src/js/server/models/**/*.js').forEach(function(modelPath) {
  require(path.resolve(modelPath));
});

/**
 * Return Q promises from mongoose exec
 */
mongoose.Query.prototype.execOld = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = function(op, cb) {
  var self = this;

  if ('function' == typeof op) {
    cb = op;
    op = null;
  } else if ('string' == typeof op) {
    this.op = op;
  }

  return Q.Promise(function(resolve, reject) {
    if (!self.op) {
      cb && cb(null, undefined);
      resolve();
      return;
    }

    self[self.op].call(self, function(error, res) {
      if (error) {
        cb && cb(error);
        reject(error);
        return;
      }
      cb && cb.apply(null, arguments);
      resolve(res);
    });
  });
};

/**
 * Return Q promises from mongoose save
 */
mongoose.Document.prototype.savePromise = function() {
  var self = this;
  var isNew = self.isNew;
  var original = _.clone(self._orig);
  return Q.Promise(function(resolve, reject){
    self.save(function(err, item, numberAffected){
      if (err) {
        return reject(err);
      }
      resolve([item, numberAffected]);
    });
  });
};