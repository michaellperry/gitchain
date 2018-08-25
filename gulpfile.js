var gulp = require('gulp');

var compile = require('./tasks/build');
var clean = require('./tasks/clean');

gulp.task('clean', clean);
gulp.task('default', compile);