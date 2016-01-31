'use strict';

var pickupTransport = require('nodemailer-pickup-transport'),
    fs = require('fs'),
    path = require('path');

var mailPath = path.resolve(__dirname, '../../tmp/mail');
fs.access(mailPath, fs.F_OK, function(err) {
  if (err) {
    fs.mkdirParentSync(mailPath);
  }
});

module.exports = {
  db: {
    uri: (process.env.MONGO_BASE || 'mongodb://localhost/') + 'smp-test',
    options: {
      user: '',
      pass: ''
    }
  },
  mail: {
    disable: false,
    transport: pickupTransport({
      directory: mailPath
    })
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny', 'skip'
    format: 'skip',
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