var gulp = require('gulp');
var requireDir = require('require-dir');
var del = require('del');
var nodemon = require('gulp-nodemon');
var dir = requireDir('./tasks');
var paths = require('./tasks/paths');

var bowerDependencies = require('./tasks/dependencies.js');

var watching = false;
gulp.task('watch', ['build'], function () {
  watching = true;
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles.paths, ['styles']);
  gulp.watch(paths.html, ['html-view']);

  gulp.watch(bowerDependencies.bowerJsDependencies, ['vendor-scripts']);
  gulp.watch(bowerDependencies.bowerCssDependencies, ['vendor-styles']);
});

gulp.task('clean', function (cb) {
  //  Don't clean when watching files.
  if (watching) return cb();

  return del('public/assets', cb);
});

gulp.task('nodemon', function () {
  nodemon({
    script: './static_server/static_server.js',
    watch: './static_server/static_server.js',
    ext: 'js'
  })
  .on('restart', function () {
    console.log('Server restarted!');
  });
});

gulp.task('build', ['assets']);
gulp.task('default', ['nodemon', 'watch']);
