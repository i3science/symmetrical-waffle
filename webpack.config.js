module.exports = {
  entry: './src/js/client/main.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',

      query: {
        presets: ['es2015','react']
      }
    }]
  }
};