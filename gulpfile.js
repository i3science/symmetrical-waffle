'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    webpack = require('webpack-stream'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    lint = require('gulp-eslint'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

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
    main: './src/js/main.js'
  }
};

// Open the project in the default browser
gulp.task('open', ['start'], function(){
  gulp.src('dist/index.html')
      .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// Start local dev server
gulp.task('start', function () {
  nodemon({
    exec: 'node',
    script: 'server.js',
    ext: 'js html',
    ignore: ['.git/*', 'node_modules/*'],
    env: { 'NODE_ENV': 'development' },
    livereload: true,
    stdout: false
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^Listening/.test(chunk)) {
        livereload.reload();
      }
      process.stdout.write(chunk);
    })
  });
});

// Start local dev server and node-inspector
gulp.task('debug', ['inspect'], function(){
  nodemon({
    exec: 'node-inspector & node --debug',
    script: 'server.js',
    ext: 'js html',
    ignore: ['.git/*', 'node_modules/*'],
    env: { 'NODE_ENV': 'development' },
    stdout: false
  }).on('restart', function () {
    this.stdout.on('data', function(chunk) {
      if (/^listening/.test(chunk)) {
        livereload.reload();
      }
      process.stdout.write(chunk);
    })
  });
});

// Start node-inspector
gulp.task('inspect', function(){
  gulp.src([]).pipe(nodeInspector({  // You'll need to tweak these settings per your setup
    debugPort: 5859,
    webHost: '0.0.0.0',
    webPort: '8085',
    preload: false
  }));
});

// Lint javascript
gulp.task('jslint', function(){
  return gulp.src(config.watch.js)
      .pipe(lint({config: '.eslintrc'}))
      .pipe(lint.format());
});

// Lint css
gulp.task('csslint', function(){
  gulp.src('src/public/*.css')
      .pipe(csslint()) 
      .pipe(csslint.reporter());
});

// Lint tasks
gulp.task('lint', ['jslint','csslint']);

// Pack javascript
gulp.task('js', function(){
  return gulp.src('src/js/main.js')
      .pipe(webpack())
      .pipe(gulp.dest('dist/main.js'))
      .pipe(connect.reload());
});

// Pack css
gulp.task('css', function(){
  return gulp.src(config.watch.css)
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(config.watch.dist + '/css'))
      .pipe(connect.reload());
});

gulp.task('html', function(){
  return gulp.src(config.watch.html)
      .pipe(connect.reload());
})

// Build tasks
gulp.task('build', ['lint','pack']);

// Watch files for changes
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(config.watch.html, ['html']);
  gulp.watch(config.watch.js, ['js', 'lint']);
});

// Default task
gulp.task('default', ['css','js','lint','open','watch']);