var gulp = require('gulp'),
  livereload = require('gulp-livereload');
  nodemon = require('gulp-nodemon');

gulp.task('server', function() {
	nodemon({
		ignore: ['client/**'],
		script: 'server.js',
		ext: 'js',
		nodeArgs: ['--debug=5858']
	});
});
gulp.task('reload', function() {
	gulp.src('client/**').pipe(livereload());
});
gulp.task('watch', function() {
  livereload.listen({ basePath: '/client' });
  gulp.watch('client/**', ['reload'])
});

gulp.task('default', ['server','watch']);