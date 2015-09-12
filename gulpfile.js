var gulp = require("gulp");
var rimraf = require("rimraf");

var nodemon = require("gulp-nodemon");
var webpack = require("webpack-stream");

// dist ディレクトリを掃除
gulp.task("clean", function (callback) {
  rimraf("./dist/*", callback);
});

// サーバー
gulp.task("server", function () {
  nodemon({
    script: "./src/start.js",
    ext: "js jsx", // 変更があった時に再起動するファイルの拡張子
    ignore: ["dist/**"],
    env: { "PORT": 3000 }
  });
});

// webpack
// clean が完了してから行う。
// そうしないと、実行順によっては webpack したものが次の瞬間削除される。
gulp.task("webpack", ["clean"], function () {
  return gulp.src("./src/client.js")
    .pipe(webpack(require("./webpack.config")))
    .pipe(gulp.dest("dist"));
});

// Tasks
gulp.task("default");
gulp.task("dev", ["clean", "server", "webpack"]);
