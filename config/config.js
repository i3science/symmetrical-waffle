'use strict';

var _ = require('lodash'),
  glob = require('glob'),
  fs = require('fs'),
  path = require('path');

fs.mkdirParentSync = function(dirPath, mode, callback) {
  var dirs = dirPath.split(path.sep);
  var root = '';

  while (dirs.length > 0) {
    var dir = dirs.shift();
    if (dir === '') {
      root = path.sep;
    }
    if (!fs.existsSync(root + dir)) {
      fs.mkdirSync(root + dir);
    }
    root += dir + path.sep;
  }
};

module.exports = _.extend(
  require('./docker'),
  require('./env/all'),
  require('./env/' + process.env.NODE_ENV) || {}
);

process.on('uncaughtException', console.log);

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
  // For context switching
  var _this = this;

  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  var output = [];

  // If the glob pattern is an array, use each pattern recursively
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function(globPattern) {
      output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
    });
    return output;
  }
  // If the pattern is a string
  if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob(globPatterns, { sync: true });
      if (removeRoot) {
        files = files.map(function(file) {
          return file.replace(removeRoot, '');
        });
      }

      output = _.union(output, files);
    }
  }

  return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
  var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');

  // To include tests
  if (includeTests) {
    output = _.union(output, this.getGlobbedFiles(this.assets.tests));
  }

  return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
  var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
  return output;
};