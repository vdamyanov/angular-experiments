var gulp = require('gulp'),
    requireDir = require('require-dir'),
    dir = requireDir('./tasks'),
    paths = require('./tasks/paths'),
    rimraf = require('rimraf'),
    nodemon = require('gulp-nodemon');

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

  return rimraf('public/assets', cb);
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    watch: 'server.js',
    ext: 'js'
  })
  .on('restart', function () {
    console.log('Server restarted!');
  });
});

gulp.task('build', ['assets']);
gulp.task('default', ['nodemon', 'watch']);
