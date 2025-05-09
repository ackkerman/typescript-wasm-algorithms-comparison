const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/ts/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  experiments: {
    asyncWebAssembly: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: 'public/benchmark.html',
      filename: 'benchmark.html',
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'public',
          to: '', 
          globOptions: {
            ignore: ['**/index.html', '**/benchmark.html'], // HtmlWebpackPluginで処理するファイルを除外
          },
        },
      ],
    }),
  ],
};