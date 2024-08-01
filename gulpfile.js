const gulp = require('gulp');
const argv = require('yargs').argv;
const browserSync = require('browser-sync').create();

const config = require('./gulpConfig.json');
const path = config.path;

function isDev() {
    return !argv.prod;
}

function isProd() {
    return !!argv.prod;
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

/*Слежка за изменениями в файлах */
path.watch = {};

path.watch.html = [];
path.watch.html[0] = path.src.html[0];

function watch() {
    gulp.watch(path.watch.html, moveHtml);
}

exports.default = gulp.series(
    gulp.parallel(moveHtml),
    gulp.parallel(initServer, watch)
)