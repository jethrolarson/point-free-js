//This file dynamically compiles and runs the files as they change.
var gulp = require('gulp');
var gutil = require('gulp-util');
var cp = require('child_process');
var changed = require('gulp-changed');
var babel = require('gulp-babel');
var through = require('through2');
var paths = {
  src: ['src/**/*.js']
};

gulp.task('build', function() {
  gulp.src(paths.src)
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['build']);

gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
});