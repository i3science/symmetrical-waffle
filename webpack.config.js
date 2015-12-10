module.exports = {
  entry: './src/js/main.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',

      query: {
        presets: ['es2015','react']
      }
    }]
  }
};