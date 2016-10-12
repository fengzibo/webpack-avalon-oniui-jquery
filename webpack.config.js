var webpack = require("webpack");

var path = require("path");
module.exports = {
    entry: './src/index', //我们开发时的入口文件

    output: {path: path.join(__dirname, "dist"), filename: "bundle.js"}, //页面引用的文件
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ],
        preLoaders: [
            {test: /\.js$/, loader: "amdcss-loader"}
        ]
    },
    resolve: {
        extensions: ['.js', "", ".css"],
        alias: {
            jquery: './jquery/jquery1.11.3.min',
            avalon: './avalon/avalon.shim', //在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
            "../avalon": './avalon/avalon.shim'//由于oniui都以是../avalon来引用avalon的，需要在这里进行别名
        }
    }
}