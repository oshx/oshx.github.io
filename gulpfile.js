var config = {
    src: './src/'
};
var gulp = require('gulp');

require('./gulp/polyfill');
require('./gulp/css')(gulp, config);
gulp.task('default', ['css']);