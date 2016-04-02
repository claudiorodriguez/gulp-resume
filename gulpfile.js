'use strict'
const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const swig = require('gulp-swig');
const data = require('gulp-data');
const htmlmin = require('gulp-htmlmin');
const path = require('path');
const del = require('del');
const resumeData = require('./resume.json');

gulp.task('less', ['clean'], function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', ['clean'], function () {
  return gulp.src('./src/templates/*.html')
    .pipe(data(() => { return resumeData; }))
    .pipe(swig())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('assets', ['clean'], function () {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('clean', function () {
  return del([ 'dist/**/*', 'dist' ]);
});

// TODO: Parallelize `clean` vs. everything else when gulp v4 comes out
gulp.task('default', ['assets', 'html', 'less']);
