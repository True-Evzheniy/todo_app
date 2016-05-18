var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + '/public/build/',
    publicPath: "build/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.json','.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: "style-loader!css-loader!sass-loader",
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.gif$/,
        loader: "url-loader?limit=10000&mimetype=image/gif"
      },
      {
        test: /\.jpg$/,
        loader: "url-loader?limit=10000&mimetype=image/jpg"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=10000&mimetype=image/png"
      },
      {
        test: /\.svg/,
        loader: "url-loader?limit=26000&mimetype=image/svg+xml"
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel",
        exclude: [/node_modules/, /public/],
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};