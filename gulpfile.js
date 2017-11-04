'use strict';

var gulp = require('gulp');
var pkg = require('./package.json');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var gulpPugBeautify = require('gulp-pug-beautify');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');

// This method runs all required components to output required files to the static folder.
// Note that after the process has ended, please run 'gulp watch' to start actual development.
gulp.task('start', [
    'remove-previous-static-files', 
    'copy-files-to-output', 
    'output-scss-to-css', 
    'minify-css',
    'turn-pug-to-html']);

// Removes any existing copies of the "static" folder and replaces the content with
// the newest versions of all required static files
gulp.task('remove-previous-static-files', function () {
   return gulp.src('static', {read: false}).pipe(clean());
});

// Copy Bootstrap, jQuery, Font Awesome, Images, and Javascript resources to the static folder
gulp.task('copy-files-to-output', function() {
    // Bootstrap
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('static/vendor/bootstrap'))
    // jQuery
    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('static/vendor/jquery'))
    // Font Awesome
    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('static/vendor/font-awesome'))
    // Images
    gulp.src(['lib/images/**/*']).pipe(gulp.dest('static/img'))
    // Javascript
    gulp.src(['lib/js/**/*.js']).pipe(gulp.dest('static/js'))
});

// Render SCSS files as a single CSS
gulp.task('output-scss-to-css', function () {
  return gulp.src('lib/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('static/css'));
});

// Minify the existing CSS file in the static folder
gulp.task('minify-css', () => {
  return gulp.src('static/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static/css'));
});

// Compiles PUG files into static HTML file. HTML files are also prettified (formatted).
gulp.task('turn-pug-to-html', function () {
  return gulp.src('content/*.pug')
    .pipe(gulpPugBeautify({ omit_empty_lines: true }))
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('static'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'static'
        },
    })
});

// Dev task with browserSync
gulp.task('watch', ['browserSync', 'output-scss-to-css', 'turn-pug-to-html', 'minify-css'], function() {
    gulp.watch('content/*.pug', ['turn-pug-to-html']);
    gulp.watch('content/*.pug', browserSync.reload);
    gulp.watch('static/*.html', browserSync.reload);
    gulp.watch('static/css/**/*.css', browserSync.reload);
    gulp.watch('static/js/**/*.js', browserSync.reload);
    gulp.watch('lib/scss/**/*.scss', ['output-scss-to-css']);
});
