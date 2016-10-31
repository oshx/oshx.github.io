function html(gulp, config) {
    'use strict';
    var logHandler = config.logHandler();
    var logRequire = logHandler.require;
    var log = logHandler.log;
    var success = logHandler.success;

    var minify = logRequire('gulp-htmlmin');
    var rename = logRequire('gulp-rename');
    var removeComment = logRequire('gulp-strip-comments');
    var htmlFormat = '*.dev.html';
    var target = {
        root: {
            from: './' + htmlFormat,
            to: './'
        },
        src: {
            from: config.src + 'html/' + htmlFormat,
            to: config.src + 'html/'
        }
    };
    function renameDist(path) {
        log('rename:', path.basename);
        path.basename = path.basename.replace(/\.dev/, '');
    }
    function minifyHtml(from, to) {
        log('minify html');
        return gulp.src(from)
            .pipe(removeComment({
                safe: true
            }))
            .pipe(minify({
                collapseWhitespace: true
            }))
            .pipe(rename(renameDist))
            .pipe(gulp.dest(to));
    }
    function taskMin() {
        log('minify ' + target.root.from);
        minifyHtml(target.root.from, target.root.to);
        log('minify ' + target.src.from);
        minifyHtml(target.src.from, target.src.to);
    }
    gulp.task('html', taskMin);
    gulp.task('html:watch', function(){
        log('if you want to quit the watching, press the CTRL + C');
        log('감시 작업을 마치려면 CTRL + C를 누르세요');
        success('Watching HTML');
        gulp.watch(target.root.from, ['html']);
        gulp.watch(target.src.from, ['html']);
    });
}
module.exports = html;