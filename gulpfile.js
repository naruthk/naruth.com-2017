'use strict';

var gulp = require('gulp');
var pkg = require('./package.json');

var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var gulpPugBeautify = require('gulp-pug-beautify');
var cleanCSS = require('gulp-clean-css');
 

// Copy required files to their distributions folder
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('dist/vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('dist/vendor/font-awesome'))

    // Images
    gulp.src(['images/**/*'])
        .pipe(gulp.dest('dist/img'))

    // Javascript
    gulp.src(['js/**/*'])
        .pipe(gulp.dest('dist/js'))
});


// Turn SCSS files into CSS
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

var pugFiles = ['index.pug', 'modules/**/*.pug']

// Minified CSS
gulp.task('minify-css', () => {
  return gulp.src('./dist/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// // Build HTML using PUG template, then Prettify it
gulp.task('pug', function () {
  return gulp.src(pugFiles)
    .pipe(gulpPugBeautify({ omit_empty_lines: true }))
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Run everything
gulp.task('default', ['sass', 'pug', 'copy', 'minify-css']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});

// Dev task with browserSync
gulp.task('watch', ['browserSync', 'sass', 'pug', 'minify-css'], function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch(pugFiles, ['pug']);
    // Reloads the browser whenever HTML, custom CSS, or JS files change
    gulp.watch('dist/*.html', browserSync.reload);
    gulp.watch(pugFiles, browserSync.reload);
    gulp.watch('dist/css/**/*.css', browserSync.reload);
    gulp.watch('dist/js/**/*.js', browserSync.reload);
});
