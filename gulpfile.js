/**
 * Created by paul on 3/19/16.
 */
'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src(['**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint']);
