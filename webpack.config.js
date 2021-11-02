const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const glob = require('glob');
const path = require("path");

module.exports = {
  devServer: {
    compress: true,
    public: 'nicolas.degheselle.local' // That solved it
  },
  entry: {
    scripts: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [  MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        inject: false
    }),
    new MiniCssExtractPlugin({
        filename: "styles.css",
    }),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`src/*.html`, { nodir: true }),
    //   safelist: ['active', 'only-content']
    // })
  ]
};