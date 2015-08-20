//This file dynamically compiles and runs the files as they change. 
var gulp = require('gulp');
var gutil = require('gulp-util');
var cp = require('child_process');
var changed = require('gulp-changed');
var babel = require('gulp-babel');
var through = require('through2');
var paths = {
  src: ['**/*.js', '../src/**/*.js', '!gulpfile.js']
};

//break gulp log so presentation isn't as noisy
var cl = console.log;
console.log = function() {
  var args = Array.prototype.slice.call(arguments);
  if (args.length) {
    if (/^\[.*gulp.*\]$/.test(args[0])) {
      return;
    }
  }
  return cl.apply(console, args);
};

gulp.task('test', function() {
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
    .pipe(changed('../build'))
    .pipe(through.obj(function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }

      if (file.isStream()) {
        cb(new gutil.PluginError('auto exec', 'Streaming not supported'));
        return;
      }
      
      try {
        console.log(file.relative);
        cp.spawn('babel-node', [file.path], { stdio: 'inherit' });
      } catch (e) {
        console.log(e);
      }
      this.push(file);
      cb();
    }))
    .pipe(gulp.dest('../build'));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['test']);
});

gulp.task('default', ['watch']);