const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
    entry:[ 
        './index.js',
    ],

    output: {
      filename: "main.[contenthash].js",
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [new HtmlWebpackPlugin({
      template: "./index.html"
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