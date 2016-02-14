'use strict';

var pickupTransport = require('nodemailer-pickup-transport'),
    fs = require('fs'),
    path = require('path'),
    multer = require('multer');

var mailPath = path.resolve(__dirname, '../../tmp/mail');
fs.access(mailPath, fs.F_OK, function(err) {
  if (err) {
    fs.mkdirParentSync(mailPath);
  }
});

module.exports = {
  db: {
    uri: (process.env.MONGO_BASE || 'mongodb://localhost/') + 'smp',
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
  },
  tmpDir: path.resolve(__dirname, '../../tmp'),
  filesDir: path.resolve(__dirname, '../../tmp/files'),
  uploadsDir: path.resolve(__dirname, '../../tmp/uploads'),
  uploader: multer({
    dest: path.resolve(__dirname, '../../tmp/uploads/'),
    limits: {
        fileSize: 10000000,
        files: 1
    }
  })
};