var config = {
    logHandler: require('./gulp/log'),
    src: './src/'
};
var gulp = require('gulp');
require('./gulp/polyfill', config);
require('./gulp/css')(gulp, config);

gulp.task('default', ['css']);