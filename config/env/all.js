'use strict';

module.exports = {
  app: {
    title: 'SMP',
    description: '',
    keywords: ''
  },
  debug: process.env.DEBUG || false,
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  session: {
    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    secret: 'SMP',
    // The name of the MongoDB collection to store sessions in
    collection: 'sessions',
    name: 'smp',
    // The session cookie settings
    cookie: {
      path: '/',
      httpOnly: false,
      // If secure is set to true then it will cause the cookie to be set
      // only when SSL-enabled (HTTPS) is used, and otherwise it won't
      // set a cookie. 'true' is recommended yet it requires the above
      // mentioned pre-requisite.
      secure: false,
      // Only set the maxAge to null if the cookie shouldn't be expired
      // at all. The cookie will expunge when the browser is closed.
      maxAge: null,
      // To set the cookie in a specific domain uncomment the following 
      // setting:
      // domain: 'yourdomain.com'

    }
  },
  mail: {
    disable: false,
    transport: 'smtps://user%40gmail.com:pass@smtp.gmail.com'
  },
  ssl: {
    enabled: false
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      stream: 'access.log'
    }
  },
  assets: {
    lib: {
      css: [
      ],
      js: [
      ]
    },
    css: [
      'public/modules/**/css/*.css'
    ],
    js: [
      'dist/bundle.js'
    ],
    tests: [
      'test/js/client/*/*.js'
    ]
  }
};