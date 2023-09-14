const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';

const devtool = devMode ? 'source-map' : undefined;
const target = devMode ? 'web' : 'browserslist';

module.exports = {
    mode,
    devtool,
    target,


  entry: path.resolve(__dirname,'src','index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
  },

   plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html')
    })
   ],

   module: {
    rules: [
        //HTML
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
}