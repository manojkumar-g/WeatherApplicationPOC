const webpack = require('webpack');
const path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry : APP_DIR+"/index.jsx",
  output : {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
      inline: true,
      port: 8080,
   },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
