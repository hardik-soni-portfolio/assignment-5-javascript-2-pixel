const path = require('path');

module.exports = {
  entry: './src/main.js',
  mode: "development",
  output: {
    path: path.resolve('./'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }]
  }
};