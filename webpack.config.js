// Generated using webpack-cli https://github.com/webpack/webpack-cli
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node',
  plugins: [new CleanWebpackPlugin()],
  module: {},
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
