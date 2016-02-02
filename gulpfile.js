var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var karma = require('gulp-karma');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var gulpProtractorAngular = require('gulp-angular-protractor');


var paths = {
  scripts: [
    'libs/angular/angular.js',
    'js/core/**/*.js',
    '!js/core/tests/*.js'
  ],
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
      browsers: ['Firefox'],
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

gulp.task('partials', function(){
  gulp.src('./partials/**/*.*')
  .pipe(gulp.dest('static/partials'));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('bundle.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('static/css'));
});

gulp.task('protractor', function(callback) {
    gulp
        .src(['example_spec.js'])
        .pipe(gulpProtractorAngular({
            'configFile': 'protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', callback);
});

gulp.task('default', ['scripts', 'partials', 'sass']);
