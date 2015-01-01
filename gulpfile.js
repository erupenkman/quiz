var gulp = require('gulp'),
  connect = require('gulp-connect'),
  nodemon = require('gulp-nodemon');

gulp.task('server', function() {
	nodemon({
		script: 'server.js',
		ext: 'js',
		nodeArgs: ['--debug=5858']
	});
});

gulp.task('connect', function() {
  connect.server({
  	bases: ['.'],
    port: 8081
  });
});
gulp.task('default', ['server','connect']);