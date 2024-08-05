const gulp = require('gulp');
/*Для копирования директории */
const gulpCopy = require('gulp-copy'); 
/*Работа с аргументами командной строки */
const argv = require('yargs').argv;
/*Запуск локалхоста */
const browserSync = require('browser-sync').create();
/*Работа с препроцессором sass */
const sass = require('gulp-sass')(require('sass'));
/*Позволяет DevTools отслеживать стили в исходных файлах */
const sourcemaps = require('gulp-sourcemaps');
/*Плагин для создания условий в gulp файле */
const gulpIf = require('gulp-if');
/*Плагин для расстановки префиксов */
const autoprefixer = require('gulp-autoprefixer');
/*Плагин для минификации css */
const csso = require('gulp-csso');
/*Плагин для переименования файлов */
const rename = require('gulp-rename');
/*Плагин для группировки медия запросов в стилях */
const gcmq = require('gulp-group-css-media-queries');
/*Плагин, который будет использован для очистки директории */
const del = require('del');

const config = require('./gulp.config.json');
const path = config.path;

function isDev() {
    return !argv.prod;
}

function isProd() {
    return !!argv.prod;
}

function clean(){
    return del([path.dist.distPath]);
}

function initServer() {
    browserSync.init({
        open: true,
        server: path.dist.distPath
    });
}

path.src.html[0] = path.src.srcPath + path.src.html[0];
path.dist.html = path.dist.distPath + path.dist.html;

function moveHtml() {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.dist.html))
        .on('end', browserSync.reload);
}

path.src.images[0] = path.src.srcPath + path.src.images[0];
path.dist.images = path.dist.distPath + path.dist.images;

function moveImages() {
    return gulp.src(path.src.images)
        .pipe(gulpCopy(path.dist.images, {prefix: 1}))
        .pipe(gulp.dest(path.dist.images))
        .on('end', browserSync.reload);
}

path.src.style[0] = path.src.srcPath + path.src.style[0];
path.src.style[1] = path.src.srcPath + path.src.style[1];

path.dist.style = path.dist.distPath + path.dist.style;

function scss() {
    return gulp.src(path.src.style)
        .pipe(gulpIf(isDev(), sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpIf(
            isProd(),
            autoprefixer({
                grid: true
            })
        ))
        .pipe(gulpIf(isProd(), gcmq()))
        .pipe(gulpIf(isDev(), sourcemaps.write()))
        .pipe(gulpIf(isProd(), csso()))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.style))
        .pipe(browserSync.reload({stream: true}))

}

/*Слежка за изменениями в файлах */
path.watch = {};

path.watch.html = [];
path.watch.html[0] = path.src.html[0];

path.watch.style = [];
path.watch.style[0] = path.src.style[0];
path.watch.style[1] = path.src.style[1];

path.watch.images = [];
path.watch.images[0] = path.src.images;

function watch() {
    gulp.watch(path.watch.html, moveHtml);
    gulp.watch(path.watch.style, scss);
    gulp.watch(path.watch.images, moveImages)
}

exports.default = gulp.series(
    gulp.parallel(clean),
    gulp.parallel(moveHtml, scss, moveImages),
    gulp.parallel(initServer, watch)
)