var gulp = require('gulp');
var exec = require('gulp-exec');
var changed = require('gulp-changed');

var paths = {src: ['src/**/*.js']};

gulp.task('test', function(){
  var options = {
    continueOnError: true, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to gutil.template()
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };
  gulp.src(paths.src)
    .pipe(changed('build'))
    .pipe(
      exec('node <%= file.path %>', options)
    ).pipe(exec.reporter(reportOptions))
    .pipe(gulp.dest('build'));
});

gulp.task('default',['test']);

gulp.task('watch', function() {
    gulp.watch(paths.src, ['test']);
});