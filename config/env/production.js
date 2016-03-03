'use strict';

var path = require('path'),
    multer = require('multer'),
    sendgridTransport = require('nodemailer-sendgrid-transport');

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
    transport: sendgridTransport({
      auth: {
        api_key: process.env.SENDGRID_KEY
      }
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
  tmpDir: path.resolve('/tmp/'),
  filesDir: path.resolve(__dirname, '../../tmp/files'),
  uploadsDir: path.resolve('/tmp/uploads'),
  uploader: multer({
    dest: path.resolve('/tmp/uploads/'),
    limits: {
        fileSize: 10000000,
        files: 1
    }
  })
};