'use strict';

// Set up ES6/JSX support server-side
require('babel-register');
/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
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

exports = module.exports = {
    db: db,
    app: app,
    config: config
};