import { DefinePlugin, optimize } from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin';

export default {
  // context: `${process.cwd()}/app`,
  entry: {
    css: './styles/app.styl',
    vendor: [
      'd3',
      'immutable',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-actions',
      'redux-immutablejs'
    ],
    dev: [
      'redux-devtools',
      'redux-devtools-dock-monitor',
      'redux-devtools-log-monitor'
    ],
    app: './app/app.js'
  },
  output: {
    path: './build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.styl$/, loaders: ['style', 'css', 'stylus'] }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
    }),
    new optimize.CommonsChunkPlugin({names:['vendor', 'dev']}),
    new HTMLWebpackPlugin({title: 'EMMA Toolkit'})
  ],
  devServer: {
    contentBase: './build'
  }
};
