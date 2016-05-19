var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

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
        loader: "style-loader!css-loader!sass-loader!postcss-loader",
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        loader: "url-loader?limit=10000"
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
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
};