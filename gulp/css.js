function css(gulp, config){
    var sass = require('gulp-sass');
    var plumber = require('gulp-plumber');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('gulp-autoprefixer');
    var csslint = require('gulp-csslint');
    require('es6-promise').polyfill();

	var fileScss = '**/*.scss';
    var fileCss = '**/*.css';
    var destCss = config.src + 'css/';
    var compileScss = config.src + 'scss/' + fileScss;
    var lintTargetCss = destCss + fileCss;
    gulp.task('css', function () {
        scssCompile(compileScss, destCss);
        cssLint(lintTargetCss);
    });
	gulp.task('css:watch', function () {
        console.log(
        '[Odi:NOTICE] if you want to quit the watching, press the CTRL + C',
        '\n[오디:알림] 감시 작업을 마치려면 CTRL + C를 누르세요'
        );
        gulp.watch(compileScss, ['css']);
	});
    function cssLint(targetCss){
        return gulp.src([
            targetCss
        ])
        .pipe(plumber())
        .pipe(csslint())
        .pipe(csslint.reporter());
    }

    function scssCompile(compileBase, targetBase){
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