var path = require("path");

module.exports = {
  resolve: {
    modulesDirectories: ["node_modules"],
    extensions: ["", ".js", ".jsx"],
    alias: {
      "src": path.resolve(process.cwd(), "src")
    }
  },
  output: {
    filename: "main.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: require.resolve("babel-loader") }
    ]
  },
  status: {
    colors: true
  },
  devtool: "source-map",
  watch: true,
  keepalive: true
};
