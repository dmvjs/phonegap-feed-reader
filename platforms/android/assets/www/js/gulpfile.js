var gulp = require('gulp')
	, shell = require('gulp-shell');

gulp.task('default', shell.task([
	'browserify index.js -o app.js',
	'uglifyjs app.js -o app.min.js',
	'cordova build ios',
	'cordova build android'
]));
