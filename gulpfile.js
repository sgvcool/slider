'use strict';

var syntax        = 'scss'; // Syntax: sass or scss;

const gulp        = require('gulp'),
    sass          = require('gulp-sass'),
    spritesmith   = require('gulp.spritesmith'),
    autoprefixer  = require('gulp-autoprefixer'),
    uglify        = require('gulp-uglify-es').default,
    concat        = require('gulp-concat'),
    cssnano       = require('gulp-cssnano'),
    rename        = require('gulp-rename'),
    browserSync   = require('browser-sync'),
    del           = require('del'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant'),
    imageminAdvpng = require('imagemin-advpng'),
    webp            = require("imagemin-webp"),
    extReplace = require("gulp-ext-replace"),
    sourcemaps    = require('gulp-sourcemaps'),
    cache         = require('gulp-cache');

var props = {
    src: "app",
    target: "dist"
};

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        proxy: "preprod.dobramine.com",
        notify: false
    });
});

gulp.task('img', ['sprite'], /*['exportWebPSprite'],*/ function(){
    return gulp.src('app/img/**/*')
        .pipe(
            cache(
                imagemin(
                    {
                        interlaced: true,
                        progressive: true,
                        svgoPlugins: [{removeViewBox: false}],
                        use: [pngquant(), imageminAdvpng()]
                    }
                )
            )
        )
        .pipe(gulp.dest('dist/img'))
});

gulp.task('sass', function(){
    return gulp.src([
        'app/scss/**/*.scss' /*{since: gulp.lastRun('sass')}*/
    ])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
});

/**
 *  generate sprite ****
 */
gulp.task('sprite', function () {
    var spriteData = gulp.src('sprite-icons/**/*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            padding: 3
        }));
    return spriteData.pipe(gulp.dest('app/img/sprites/'));
});

gulp.task("exportWebPSprite", ['sprite'], function() {
    let src = "app/img/sprites/**/*.png"; // Where your PNGs are coming from.
    let dest = "app/img/sprites/"; // Where your WebPs are going.
    return gulp.src(src)
        .pipe(imagemin([
            webp({
                quality: 85
            })
        ]))
        .pipe(extReplace(".webp"))
        .pipe(gulp.dest(dest));
});

/**
 *  generate sprite ****
 */

gulp.task('fade-slider', function() {
    return gulp.src([
        'app/js/lottie.min.js',
        'app/libs/fade-slider/js/fade-slider.js',
        'app/js/category-product.js'
    ])
        .pipe(concat('fade-slider.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('slot-js', function() {
    return gulp.src([
        'app/js/post.js'
    ])
        .pipe(concat('post.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});


/**
 * Переделать под mode с одним таском
 */
gulp.task('scripts-desktop', ['slot-js', 'fade-slider'], function() {
    return gulp.src([
        'app/js/jquery.min.js',
        'app/js/ui-script.js',
        'app/js/jquery.lazyload.min.js',
        'app/js/common.js',
        'app/js/menu-desctop.js',
        'app/js/goto-desctop.js',
        'app/js/jquery.tablesorter.min.js',
        'app/js/popup.js'
    ])
        .pipe(concat('desktop.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-mobile', ['slot-js', 'fade-slider'], function() {
    return gulp.src([
        'app/js/jquery.min.js',

        'app/js/ui-script.js',

        'app/js/jquery.lazyload.min.js',
        'app/js/common.js',
        'app/js/menu-mobile.js',
        'app/js/goto-mobile.js',
        'app/js/jquery.tablesorter.min.js',
        'app/js/popup.js'
    ])
        .pipe(concat('mobile.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean',function(){
    return(del.sync('dist'));
});

gulp.task('watch',['clean', 'img', 'scripts-desktop', 'scripts-mobile'], function(){
    gulp.watch('app/scss/**/*.scss',['sass']);
    gulp.watch('app/js/**/*.js').on('change',browserSync.reload);
    gulp.watch(['**/*.php']).on('change',browserSync.reload);
});

gulp.task('default', [/*'browser-sync',*/ 'watch']);