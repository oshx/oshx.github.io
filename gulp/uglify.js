function uglify(gulp, config){
    'use strict';
    var logHandler = config.logHandler();
    var log = logHandler.log;
    var warn = logHandler.warn;
    var load = logHandler.load;
    var logRequire = logHandler.require;

    var uglify = logRequire('gulp-uglifyjs');
    var srcPath = config.src + 'js/**/*.js';
    var destPath = config.src + 'js';
    log(srcPath);
    log(destPath);
    function taskUglify(){
        log('Uglify javascript files');
        gulp.src(srcPath)
            .pipe(uglify('main.min.js'),{
                outSourceMap:true
            })
            .pipe(gulp.dest(destPath));
    }
    gulp.task('uglify', taskUglify);
}
module.exports = uglify;