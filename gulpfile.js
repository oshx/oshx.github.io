var config = {
    logHandler: require('./util/log'),
    src: './src/'
};
var gulp = config.logHandler().require('gulp');
require('./gulp/polyfill', config);
require('./gulp/css')(gulp, config);
require('./gulp/html')(gulp, config);

gulp.task('default', ['css']);