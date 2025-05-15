const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/ts/index.ts',
    benchmark: './src/ts/benchmark.ts',
  },
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
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  experiments: {
    asyncWebAssembly: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: 'public/benchmark.html',
      filename: 'benchmark.html',
      chunks: ['benchmark'],
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'public',
          to: '.', 
          globOptions: {
            ignore: ['**/index.html', '**/benchmark.html'], // HtmlWebpackPluginで処理するファイルを除外
          },
        },
      ],
    }),
  ],
};