"use strict";
var gulp = require('gulp');
var connect = require('gulp-connect'); // run as local dev server
var open = require('gulp-open'); // open url in browser
var browserify =require('browserify'); //bundles js
var reactify = require('reactify');  //transforms react jsx to js
var source = require('vinyl-source-stream'); //uses conventional text streams with gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // lint js files , including jsx



var config={
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        css: [
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ],
        dist: './dist',
        mainJs: './src/script.js'
    }

};


// start a local devlpment server
 gulp.task('connect', function(){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
 });

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseUrl +':'+config.port + '/'}));
});

gulp.task('html', function(){
   gulp.src(config.paths.html)
       .pipe(gulp.dest(config.paths.dist))
       .pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(config.paths.mainJs)
       .transform(reactify)
       .bundle()
       .on('error', console.error.bind(console))
       .pipe(source('bundle.js'))
       .pipe(gulp.dest(config.paths.dist + '/scripts'))
       .pipe(connect.reload());
});

gulp.task('css', function () {
   gulp.src(config.paths.css)
       .pipe(concat('bundle.css'))
       .pipe(gulp.dest(config.paths.dist + '/css'));
});
//Migrates images to the dist folder
//Note that i can even optimize my images here
gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist +'/images'))
        .pipe(connect.reload());
    //publish favicon
    gulp.src('./src/favicon.ico')
         .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({config:'eslint.config.json'}))
        .pipe(lint.format());
});
gulp.task('watch', function(){
   gulp.watch(config.paths.html, ['html']);
   gulp.watch(config.paths.js, ['js','lint']);
   gulp.watch(config.paths.css, ['css']);
});



gulp.task('default', ['html', 'js','css','images','lint', 'open', 'watch']);