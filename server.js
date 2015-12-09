(function(){
  'use strict';
  /**
   * Module dependencies.
   */
  var express = require('express'),
      http = require('http'),
      mongoose = require('mongoose'),
      init = require('./config/init')(),
      config = require('./config/config'),
      chalk = require('chalk'),
      q = require('q');

  // Enable long stacktraces in promises
  q.longStackSupport = true;

  var db = require('./config/mongoose');
  var app = require('./config/express')(db);

  // Bootstrap passport config
  require('./config/passport')();

  // Start the app by listening on <port>
  app.listen(config.port);

  // Expose app
  exports = module.exports = app;

  // Logging initialization
  console.log('--');
  console.log(chalk.green(config.app.title + ' application started'));
  console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
  console.log(chalk.green('Port:\t\t\t\t' + config.port));
  console.log(chalk.green('Database:\t\t\t' + process.env.MONGO_URL || config.db.uri));
  if (process.env.NODE_ENV === 'secure') {
    console.log(chalk.green('HTTPs:\t\t\t\ton'));
  }
  console.log('--');
})();