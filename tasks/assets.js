var path = require('path');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var stylus = require('gulp-stylus');
var order = require('gulp-order');
var concat = require('gulp-concat');
var paths = require('./paths');
var autoprefixer = require('gulp-autoprefixer');

//-- Bower Dependencies -----------------------------------------------------
var bowerDependencies = require('./dependencies');
var bowerJsDependencies = bowerDependencies.bowerJsDependencies;
var bowerCssDependencies = bowerDependencies.bowerCssDependencies;
var bowerImageDependencies = bowerDependencies.bowerImageDependencies;
var bowerFontDependencies = bowerDependencies.bowerFontDependencies;

var assetsDir = './public/assets';

gulp.task('scripts', ['clean'], function () {
  return gulp.src(paths.scripts)
    .pipe(order([
      'app.js',
      'componenets/**/states/*.js',
      '*.js'
    ]))
    .pipe(jshint())
    .pipe(concat('application.js', {newLine: '\n;\n'}))
    .pipe(uglify())
    .pipe(gulp.dest(assetsDir + '/js'));
});

gulp.task('styles', ['clean'], function () {
  return gulp.src(paths.styles.source)
    .pipe(stylus())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('application.css'))
    .pipe(gulp.dest(assetsDir + '/css'));
});

gulp.task('fonts', ['clean'], function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(assetsDir + '/fonts'));
});

gulp.task('html-view', ['clean'], function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(assetsDir));
});

//-- Vendor Dependencies Processing -----------------------------------------

gulp.task('vendor-scripts', ['clean'], function () {
  return gulp.src(bowerJsDependencies)
    .pipe(concat('vendor.js', {newLine: '\n;\n'}))
    .pipe(gulp.dest(assetsDir + '/js'));
});

gulp.task('vendor-styles', ['clean'], function () {
  return gulp.src(bowerCssDependencies)
    .pipe(concat('vendor.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(assetsDir + '/css'));
});

gulp.task('vendor-fonts', ['clean'], function () {
  return gulp.src(bowerFontDependencies)
    .pipe(gulp.dest(assetsDir + '/fonts'));
});

gulp.task('assets', [
  'scripts',
  'styles',
  'fonts',
  'html-view',
  'vendor-scripts',
  'vendor-styles',
  'vendor-fonts'
]);
