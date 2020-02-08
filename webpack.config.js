const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

let config = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./js/scripts.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'postcss-loader'],
                })
            }]
    },
    plugins: [
        new ExtractTextWebpackPlugin("/css/styles.css")
    ]
}

module.exports = config;