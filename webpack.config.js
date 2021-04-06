var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    name: 'client',
    path: '/src',
    entry: path.resolve('./src/demo.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve('./dist'),
        publicPath: '',
        libraryTarget: 'umd'
    },
    target: 'web',
    resolve: {
        extensions: ['', '.js'],
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'es2016'],
                    plugins: ['transform-class-properties'],
                },
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/^webworkify$/, 'webworkify-webpack')
    ]
}