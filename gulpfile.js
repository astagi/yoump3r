var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var karma = require('gulp-karma');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var gulpProtractorAngular = require('gulp-angular-protractor');


var paths = {
  scripts: [
    'libs/angular/angular.js',
    'js/core/**/*.js',
    '!js/core/tests/*.js'
  ],
  partials: './partials/**/*.*',
  sass: './sass/**/*.scss',
  sass_main: './sass/main.scss',
  images: 'assets/img/**/*'
};

var testFiles = [
  'libs/angular/angular.min.js',
  'libs/angular-mocks/angular-mocks.js',
  'js/**/*.js',
];

gulp.task('test', function () {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run',
      reporters: ['dots', 'coverage', 'coveralls'],
      coverageReporter: {
        type: 'lcov',
        dir: 'coverage/',
        subdir: '.',
      }
    }));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('static/js'));
});

gulp.task('scripts-e2e', function() {
  paths.scripts.push('libs/angular-mocks/angular-mocks.js');
  return gulp.src(paths.scripts)
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('static/js'));
});

gulp.task('partials', function(){
  gulp.src(paths.partials)
  .pipe(gulp.dest('static/partials'));
});

gulp.task('sass', function () {
  gulp.src(paths.sass_main)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('bundle.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('static/css'));
});

gulp.task('watch-partials', function () {
  gulp.watch(paths.partials, ['partials']);
});

gulp.task('watch-sass', function () {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('watch-scripts', function () {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('raw-protractor', ['scripts-e2e', 'partials', 'sass'], function(callback) {
    gulp.src(['example_spec.js'])
        .pipe(gulpProtractorAngular({
            'configFile': 'protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            console.log(e);
            callback(e);
        })
        .on('end', callback);
});

gulp.task('protractor', function(callback) {
    runSequence('raw-protractor', 'scripts');
});

gulp.task('watch', ['watch-scripts', 'watch-partials', 'watch-sass']);
gulp.task('default', ['scripts', 'partials', 'sass']);
