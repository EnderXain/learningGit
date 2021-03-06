
const   gulp        = require( "gulp" ),
        pCSS        = require( "gulp-postcss" ),
        autoPre     = require( "autoprefixer" ),
        cssVars     = require( "postcss-simple-vars" ),
        nested      = require( "postcss-nested" ),
        cssImp      = require( "postcss-import" ),
        mixins      = require( "postcss-mixins"),
        hexrgba     = require( "postcss-hexrgba");
        
gulp.task("styles", function(){
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(pCSS([cssImp, mixins, cssVars, nested, hexrgba, autoPre]))
    .on('error', function( errorInfo ){
        console.error( errorInfo.toString() );
        this.emit('end');
    })
    .pipe( gulp.dest('./app/temp/styles') );
});