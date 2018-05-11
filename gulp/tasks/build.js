const   gulp        = require('gulp'),
        imagemin    = require('gulp-imagemin'),
        del         = require('del'),
        usemin      = require('gulp-usemin'),    //minifies/compresses/revisions js/css w/ html comments (pipe it the next 3 packages to it as it allows you to use any package to accomplish these tasks)
        rev         = require('gulp-rev'),          //used for revisioning your file names (cache busting)
        nano        = require('gulp-cssnano'),      //compress css
        uglify      = require('gulp-uglify'),       //compress js
        browSync    = require( "browser-sync" ).create();

gulp.task('distview', function(){
    browSync.init({
        notify: false,
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('distroyer', function(){
    return del('./dist');
});

gulp.task('copyGeneralFiles', ['distroyer'], function(){
    let pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./dist'));
});

gulp.task( 'optimizeImages', ['distroyer', 'icons'], function(){
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/{icons,icons/**}', '!.app/assets/images/*-i.jpg'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('usemin', ['distroyer', 'styles', 'scripts'], function(){
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function(){return rev()}, function(){return nano()}],
            js: [function(){return rev()}, function(){return uglify()}]
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task( 'build', ['distroyer', 'copyGeneralFiles', 'optimizeImages', 'usemin'] );