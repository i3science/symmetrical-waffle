'use strict';

module.exports = {
  db: {
    uri: (process.env.MONGO_BASE || 'mongodb://localhost/') + 'smp-test',
    options: {
      user: '',
      pass: ''
    }
  },
  mail: {
    disable: true,
    transport: null
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