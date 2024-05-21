const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const tinypngCompress = require("gulp-tinypng-compress");

// Dynamic import for gulp-webp
async function getWebp() {
  const { default: webp } = await import("gulp-webp");
  return webp;
}

// Sassをコンパイルして通常のCSSを生成する
function compileSass() {
  return gulp
    .src("./assets/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssSorter()]))
    .pipe(mmq())
    .pipe(gulp.dest("./assets/css/"));
}

// 圧縮されていないCSSファイルのみを圧縮する
function compressCss() {
  return gulp
    .src(["./assets/css/*.css", "!./assets/css/*.min.css"])
    .pipe(cleanCss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./assets/css/"));
}

// JavaScriptを圧縮する
function compressJs() {
  return gulp
    .src(["./assets/js/**/*.js", "!./assets/js/**/*.min.js"])
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./assets/js/"));
}

// 画像ファイルを圧縮してWebPに変換する
async function convertImagesToWebp() {
  const webp = await getWebp();
  return gulp
    .src("./assets/img/src/**/*.{png,jpg,jpeg}")
    .pipe(
      tinypngCompress({
        key: "qb2Ms34q28t2l5jwnYGsjP84RJpcLmww", // APIキーをここに入力
        sigFile: "./assets/img/.tinypng-sigs",
        log: true,
      })
    )
    .pipe(gulp.dest("./assets/img")) // 圧縮された画像を保存
    .pipe(webp()) // WebP形式に変換
    .pipe(gulp.dest("./assets/img")); // WebP画像を保存
}

// ファイルの変更を監視し、適切なタスクを実行する
function watchFiles() {
  gulp.watch("./assets/sass/**/*.scss", gulp.series(compileSass, compressCss));
  gulp.watch(["./assets/js/**/*.js", "!./assets/js/**/*.min.js"], compressJs);
  gulp.watch("./assets/img/src/**/*.{png,jpg,jpeg}", convertImagesToWebp);
}

// Gulpのデフォルトタスクに監視タスクを設定
exports.default = gulp.series(compileSass, compressCss, compressJs, watchFiles);

// 公開するタスク
exports.convertImagesToWebp = convertImagesToWebp;
