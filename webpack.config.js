var path = require("path");
var webpack = require("webpack");
module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/bin/www.js'],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        loader: "babel-loader",
        query: {
          compact: false,
          presets: ["@babel/preset-env"]
        }
      }
    ]
  },
  target: "node",
  node: {
    fs: 'empty',
    net: 'empty',
    __dirname: true
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
