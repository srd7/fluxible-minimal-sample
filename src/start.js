var modulePath = require("app-module-path");

// ES6 を使う
require("babel/register");

// 相対パスを避けるために使う
// これで import "src/app.js" みたいにできる
modulePath.addPath(process.cwd());

module.exports = require("src/server.js");
