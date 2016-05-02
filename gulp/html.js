function html(gulp, config) {
    'use strict';
    var logHandler = config.logHandler();
    var log = logHandler.log;
    var logRequire = logHandler.require;

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
        log('rename to sub suffix "dev" in htmls');
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
}
module.exports = html;