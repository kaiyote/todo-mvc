var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var entryPath = path.join(__dirname, 'src/index.js')
var outputPath = path.join(__dirname, 'dist')

var TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development'
var outputFilename = TARGET_ENV === 'production' ? '[name]-[hash].js' : '[name].js'

var commonConfig = {
  output: {
    path: outputPath,
    filename: outputFilename
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: path.join(outputPath, 'index.html')
    }),
    new webpack.ProvidePlugin({
      'm': ['mithril', 'default']
    })
  ]
}

if (TARGET_ENV === 'development') {
  module.exports = merge(commonConfig, {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      entryPath
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: './src'
    }
  })
}

if (TARGET_ENV === 'production') {
  module.exports = merge(commonConfig, {
    entry: entryPath,
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: { warnings: false },
        mangle:  true
      })
    ]
  })
}
