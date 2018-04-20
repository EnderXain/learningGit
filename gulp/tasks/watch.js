const   gulp        = require( "gulp" ),
        watch       = require( "gulp-watch" ),
        browSync    = require( "browser-sync" ).create();

gulp.task( 'watch', function(){
    browSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    watch( './app/index.html', function(){
        browSync.reload();
    });

    watch( './app/assets/styles/**/*.css', function(){
        gulp.start( 'cssInject');
    });
});

gulp.task('cssInject', ['styles'], function(){
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browSync.stream());
});