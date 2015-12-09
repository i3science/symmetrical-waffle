(function(){
  'use strict';

  var config = require('./config'),
      mongoose = require('mongoose'),
      chalk = require('chalk'),
      path = require('path');

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
  config.getGlobbedFiles('./src/js/models/**/*.js').forEach(function(modelPath) {
    require(path.resolve(modelPath));
  });
})();