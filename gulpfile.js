var PATH_RESOURCE = '/src';
var PATH_SCSS = '/scss';
var PATH_JS = '/js';
var PATH_CSS = '/css';
var config = {
    compiler: {
        SCSS: PATH_RESOURCE + PATH_SCSS + '/**/*.scss',
        CSS: PATH_RESOURCE + PATH_CSS
    }
};
var gulp = require('gulp');

require('./gulp/css')(gulp, config);
gulp.task('default', ['scss']);