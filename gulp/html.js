function html(gulp, config){
    'use strict';
    var logHandler = config.logHandler();
    var log = logHandler.log;
    var logRequire = logHandler.require;

    var minify = logRequire('gulp-htmlmin');
    var rename = logRequire('gulp-rename');
    var removeComment = logRequire('gulp-strip-comments');
    var changeTarget = './*.dev.html';
    function renameDist(path){
        log('rename to sub suffix "dev" in htmls');
        path.basename = path.basename.replace(/\.dev/,'');
    }
    function min(){
        log('minify html');
        return gulp.src(changeTarget)
               .pipe(removeComment({
                   safe: true
               }))
               .pipe(minify({
                   collapseWhitespace: true
                }))
               .pipe(rename(renameDist))
               .pipe(gulp.dest('./'));
    }
    gulp.task('html', min);
}
module.exports = html;