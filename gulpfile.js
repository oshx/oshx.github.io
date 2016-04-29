var config = {
    logHandler: require('./gulp/log'),
    src: './src/'
};
var gulp = config.logHandler().require('gulp');
require('./gulp/polyfill', config);
require('./gulp/css')(gulp, config);
require('./gulp/uglify')(gulp, config);

gulp.task('default', ['css','uglify']);