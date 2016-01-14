'use strict';

var pickupTransport = require('nodemailer-pickup-transport'),
    fs = require('fs'),
    path = require('path');

var mailPath = path.resolve(__dirname, '../../mail');
fs.access(mailPath, fs.F_OK, function(err) {
  if (err) {
    fs.mkdirSync(mailPath);
  }
});

module.exports = {
  db: {
    uri: 'mongodb://localhost/smp',
    options: {
      user: '',
      pass: ''
    }
  },
  mail: {
    transport: pickupTransport({
      directory: mailPath
    })
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      //stream: 'access.log'
    }
  },
  app: {
    title: 'Social Marketplace - Development Edition'
  }
};