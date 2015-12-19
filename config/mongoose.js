(function(){
  'use strict';

  var config = require('./config'),
      mongoose = require('mongoose'),
      chalk = require('chalk'),
      path = require('path'),
      mongoose = require('mongoose'),
      Q = require('q');

  // Connect to Mongo DB
  module.exports = mongoose.connect(process.env.MONGO_URL || config.db.uri, config.db.options, function(err) {
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
  mongoose.Query.prototype.exec = function(fn) {
    var self = this;
    return Q
      .fcall(function(){
        return self.execOld();
      })
      .then(function(doc){
        if (doc && doc instanceof mongoose.Document && !doc.isNew) {
          doc._orig = doc.toObject();
        }
        if (fn) {
          fn(null, doc);
        }
        return doc;
      })
      .fail(function(err){
        if (fn) {
          return fn(err);
          throw err;
        }
      })
  };
})();