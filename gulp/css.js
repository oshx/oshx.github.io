function css(gulp, config){
    var sass = require('gulp-sass');
    var sourcemaps = require('gulp-sourcemaps');
    var postcss = require('gulp-postcss');
    var autoprefixer = require('gulp-autoprefixer');
    var scss = require('postcss-scss');
    var csslint = require('gulp-csslint');
    var plumber = require('gulp-plumber');
    var opacity = function (css, opts) {
    css.eachDecl(function(decl) {
        if (decl.prop === 'opacity') {
    	        decl.parent.insertAfter(decl, {
	                prop: '-ms-filter',
                	value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
            	});
        	}
    	});
	};
    var processors = [
        opacity,
        autoprefixer({browsers:['>0.5']})
    ];
    gulp.task('scss', function () {
     	return gulp.src(config.compiler.SCSS)
        		.pipe(plumber())
                .pipe(sourcemaps.init())
	            .pipe(postcss(processors, {syntax: scss}))
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
                .pipe(sourcemaps.write(config.compiler.CSS))
        		.pipe(csslint())
                .pipe(gulp.dest(config.compiler.CSS));
    });

	gulp.task('sass:watch', function () {
    	console.log(
                '[NOTICE] if you want to quit the watching, press the CTRL + C  - by Odi',
                '\n[알림] 감시 작업을 종료하려면 CTRL + C를 누르세요 - 오디 드림'
               );
  		gulp.watch(config.compiler.SCSS, ['sass']);
	});
};

module.exports = css;