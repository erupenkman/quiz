var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  nodemon = require('gulp-nodemon'),
  run = require('gulp-run'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
  gulp.src('./client/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/styles/'));
});
gulp.task('server', function() {
  nodemon({
    ignore: ['client/**'],
    script: 'server.js',
    ext: 'js',
    nodeArgs: ['--debug=5858']
  });
});
gulp.task('mongo', function() {
  var execed = run('mongod').exec();
});
gulp.task('reload', function() {
  gulp.src('client/**').pipe(livereload());
});
gulp.task('watch', function() {
  livereload.listen({
    basePath: '/client'
  });
  gulp.watch('client/**', ['reload'])
});

gulp.task('default', ['server', 'sass', 'watch']);

gulp.task('all', ['server', 'watch', 'sass', 'mongo']);