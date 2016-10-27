var gulp = require( 'gulp' ),
sftp = require( 'gulp-sftp' ),
sass = require('gulp-sass'),
bourbon = require('node-bourbon'),
neat = require('node-neat'),
cleanCSS = require('gulp-clean-css'),
rename = require('gulp-rename');

var host, user, pass, remotePath;
var src = 'scss/styles.scss', dest = 'primer_name/dist';
//host = '192.241.169.152', user = 'www-data', pass = 'sw33t666!', remotePath = '/var/www/dev/public_html/crystal/wp-content/themes/cc_2016/dist';

gulp.task('build', function(){
    return gulp.src(src)
        .pipe(sass({
            includePaths:bourbon.includePaths,
            includePaths:neat.includePaths
        }).on('error', sass.logError))
        .pipe(gulp.dest(dest))
        .pipe(sftp({
            host: host,
            user: user,
            pass: pass,
            remotePath: remotePath
        }));
});

gulp.task('minify', function(){
    return gulp.src(dest+'/styles.css')
        .pipe(cleanCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(dest))
        .pipe(sftp({
            host: host,
            user: user,
            pass: pass,
            remotePath: remotePath
        }));
});

gulp.task('watch',function(){
    gulp.watch('scss/**/*.scss',['build','minify']);
});

gulp.task('default',['build','minify','watch']);