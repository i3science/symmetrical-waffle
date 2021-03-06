'use strict';

// Set up ES6/JSX support server-side
require('babel-register');

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    webpack = require('webpack-stream'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    lint = require('gulp-eslint'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    mocha = require('gulp-mocha'),
    protractor = require('gulp-protractor').protractor,
    chalk = require('chalk'),
    path = require('path'),
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip');

var config = {
  watch: {
    html: [
      './src/public/**/*.html',
      './src/views/**/*.html'
    ],
    css: [
      './src/public/**/*.css'
    ],
    js: [
      './src/js/**/*.js'
    ],
    images: [
      './src/public/images/*'
    ],
    dist: './dist',
    main: './src/js/server/main.js',

    mocha: './test/js/server/**/*Test.js',
    nightwatch: './test/js/client/**/*.ee.js'
  }
};
var spawn = require('child_process').spawn,
  node;

//----
// STEP 1 - Asset consolidation & minification
//----
gulp.task('css', function(){
  return gulp.src(config.watch.css)
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(config.watch.dist + '/css'));
});
gulp.task('js', function(){
  return gulp.src('./src/js/client/main.jsx')
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('./dist'));
});
gulp.task('compile', ['css', 'js'])

//----
// STEP 2 - Asset validation & linting
//----
gulp.task('csslint', ['css'], function(){
  return gulp.src('src/public/*.css')
      .pipe(csslint()) 
      .pipe(csslint.reporter());
});
gulp.task('jslint', ['js'], function(){
  return gulp.src(config.watch.js)
      .pipe(lint({config: '.eslintrc'}))
      .pipe(lint.format());
});
gulp.task('lint', ['jslint','csslint']);

gulp.task('compile', ['js','jslint','css','csslint']);

//----
// STEP 3 - Testing
//----
gulp.task('test', ['compile'], function(){
  if (JSON.parse(process.env.SKIP_TESTS || '0')) {
    console.log('Skipping Tests');
    return;
  }
  var old = process.env.NODE_ENV;
  process.env.NODE_ENV = 'test';

  if (node) {
    node.kill();
  }
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
  node.on('end', function(){
    node.kill();
    process.env.NODE_ENV = old;
  })
  .on('error', function(e){
    node.kill();
    process.env.NODE_ENV = old;
    throw e;
  });

  // Start protractor
  return gulp.src('test/js/client/components/*.ee.js')
  .pipe(protractor({
     args: ['--harmony_proxies'],
     configFile: 'protractor.conf.js',
     debug: false
  }))
  .on('end', function(){
     node.kill();
     process.env.NODE_ENV = old;
  })
  .on('error', function(e){
     node.kill();
     process.env.NODE_ENV = old;
     throw e;
  });
});

//----
// STEP 4 - Building & packaging
//----
gulp.task('build', ['compile','test']);
gulp.task('package', ['build'], function(){
  var sources = [
    'config/**/*',
    'dist/**/*',
    'src/**/*',
    'seed/**/*',
    '.babelrc',
    'docker-setup.sh',
    'import.js',
    'init.js',
    'package.json',
    'seed.js',
    'server.js'
  ];
  return gulp.src(sources, { base: '.' })
    .pipe(tar('dist.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('.'));
});

//----
// STEP 5 - Watches
//----
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(config.watch.html, ['start']);
  gulp.watch(config.watch.css, ['start']);
  gulp.watch(config.watch.js, ['start']);
});

//----
// STEP 6 - Run
//----
// Start local dev server
gulp.task('start', ['build'], function(){
  if (node) {
    node.kill();
  }
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
  return node;
});

// Open the project in the default browser
gulp.task('open', ['start'], function(){
  gulp.src('dist/index.html')
      .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

//----
// Combined Tasks
//----
gulp.task('default', ['build','open','watch']);