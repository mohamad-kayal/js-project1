const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
    entry:[ 
        './src/index.js',
        './src/connection.js',
        './src/listHelper.js',
    ],

    output: {
      filename: "main.[contenthash].js",
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [new HtmlWebpackPlugin({
      template: "./src/template.html"
    })],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };