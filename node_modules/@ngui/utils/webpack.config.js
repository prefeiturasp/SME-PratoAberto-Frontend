var path = require("path");
var webpack = require('webpack');

module.exports = {
  entry: {
    '@ngui/utils': path.join(__dirname, 'src', 'index.ts')
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.html']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "utils.umd.js",
    library: ["utils"],
    libraryTarget: "umd"
  },
  externals: [
    /^rxjs\//,    //.... any other way? rx.umd.min.js does work?
    /^@angular\//
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      { // Support for .ts files.
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      }
    ]
  }
};
