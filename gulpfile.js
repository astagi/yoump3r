var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  scripts: [
    'js/libs/angular/angular.js',
    'js/core/**/*.js'
  ],
  images: 'assets/img/**/*'
};

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

gulp.task('default', ['scripts', 'partials']);
