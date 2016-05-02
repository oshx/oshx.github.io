function css(gulp, config) {
    var logHandler = config.logHandler();
    var log = logHandler.log;
    var warn = logHandler.warn;
    var load = logHandler.load;
    var success = logHandler.success;
    var logRequire = logHandler.require;
    var sass = logRequire('gulp-sass');
    var plumber = logRequire('gulp-plumber');
    var sourcemaps = logRequire('gulp-sourcemaps');
    var autoprefixer = logRequire('gulp-autoprefixer');
    var rename = logRequire('gulp-rename');

    var fileScss = '**/*.scss';
    var fileCss = '**/*.css';
    var destCss = config.src + 'css/';
    var compileScss = config.src + 'scss/' + fileScss;
    var lintTargetCss = destCss + fileCss;
    gulp.task('css', function () {
        scssCompile(compileScss, destCss);
        success('CSS compiled');
    });
    gulp.task('css:watch', function () {
        log('if you want to quit the watching, press the CTRL + C');
        log('감시 작업을 마치려면 CTRL + C를 누르세요');
        success('Watching SCSS');
        gulp.watch(compileScss, ['css']);
    });

    function renameCss(path){
        log('rename:',path.basename);
        path.basename += '.min'
    }
    function scssCompile(compileBase, targetBase) {
        log('Compile SCSS to CSS');
        return gulp.src([
            compileBase
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browser: [
                '> 0.5%',
                'ie > 6'
            ],
            cascade: false
        }))
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }).on('error',
            sass.logError
            )
        )
        .pipe(sourcemaps.write())
        .pipe(rename(renameCss))
        .pipe(gulp.dest(targetBase));
    }
}

module.exports = css;