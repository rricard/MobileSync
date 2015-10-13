var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'source-map',
  watch: true,
  entry: {
    "index.ios": ["./src/index.ios.js"],
    "index.android": ["./src/index.android.js"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
        query: {
          stage: 0,
          optional: 'runtime',
          plugins: ['./build-tools/babelRelayPlugin.js']
        }
      }
    ]
  },
  resolve: { extensions: ['', '.js', '.jsx', '.es6'] },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ]
};
