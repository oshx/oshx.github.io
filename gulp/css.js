function css(gulp, config){
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
    var csslint = logRequire('gulp-csslint');

    var fileScss = '**/*.scss';
    var fileCss = '**/*.css';
    var destCss = config.src + 'css/';
    var compileScss = config.src + 'scss/' + fileScss;
    var lintTargetCss = destCss + fileCss;
    gulp.task('css', function () {
        scssCompile(compileScss, destCss);
        cssLint(lintTargetCss);
        success('CSS compiled');
    });
    gulp.task('css:watch', function () {
        log('if you want to quit the watching, press the CTRL + C');
        log('감시 작업을 마치려면 CTRL + C를 누르세요');
        success('Watching');
        gulp.watch(compileScss, ['css']);
    });
    function cssLint(targetCss){
        log('Lint compiled CSS');
        return gulp.src([
            targetCss
        ])
        .pipe(plumber())
        .pipe(csslint())
        .pipe(csslint.reporter());
    }

    function scssCompile(compileBase, targetBase){
        log('Compile SCSS to CSS');
        return gulp.src([
                compileBase
        ])
        .pipe(plumber())
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
        .pipe(gulp.dest(targetBase));
    }
}

module.exports = css;