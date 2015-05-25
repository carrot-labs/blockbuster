var concat     = require('gulp-concat');
var gulp       = require('gulp');
var jeet       = require('jeet');
var jshint     = require('gulp-jshint');
var kouto      = require('kouto-swiss');
var ngAnnotate = require('gulp-ng-annotate');
var plumber    = require('gulp-plumber');
var rename     = require('gulp-rename');
var rupture    = require('rupture');
var sourcemaps = require('gulp-sourcemaps');
var stylish    = require('jshint-stylish');
var stylus     = require('gulp-stylus');
var uglify     = require('gulp-uglify');
var watch      = require('gulp-watch');

gulp.task('default', ['watch']);

gulp.task('watch', ['angular', 'copy', 'scripts', 'stylus'], function() {
  gulp.watch(['./browser/app/**/*.js'], ['angular']);
  gulp.watch(['./browser/assets/js/**/*.js'], ['scripts']);
  gulp.watch(['./browser/**/*.html'], ['copy']);
  gulp.watch(['./browser/assets/styl/**/*.styl'], ['stylus'])
});

gulp.task('angular', function() {
  var files = [
    './browser/app/agenda.js',
    './browser/app/**/module.js',
    './browser/app/**/routes.js',
    './browser/app/**/controllers/*.js',
    './browser/app/**/services/*.js',
    './browser/app/**/directives/*.js',
  ];

  return gulp
    .src(files)
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    // .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('copy', function() {
  var files = ['./browser/**/*.html', './browser/**/*.{png,jpg,svg}'];

  return gulp
    .src(files)
    .pipe(gulp.dest('./public'));
});

gulp.task('lint:server', function() {
  var files = ['./server/**/*.js'];

  return gulp
    .src(files)
    .pipe(plumber())
    .pipe(watch(files))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

gulp.task('lint:browser', function() {
  var files = ['./browser/**/*.js'];

  return gulp
    .src(files)
    .pipe(plumber())
    .pipe(watch(files))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

gulp.task('scripts', function() {
  var files = ['./browser/assets/js/**/*.js'];

  return gulp
    .src(files)
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('stylus', function() {
  var files = ['./browser/assets/styl/styles.styl'];

  return gulp
    .src(files)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true,
      use: [jeet(), kouto(), rupture()]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/assets/css'));
});
