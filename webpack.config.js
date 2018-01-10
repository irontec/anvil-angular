/**
 * Created by ipena on 9/01/18.
 */

const webpack = require('webpack');
const path = require('path');


module.exports = {
    entry: './index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'angular-anvil.min.js',
        library: {
            root: "angular-anvil",
            commonjs: "angular-anvil"
        },
        libraryTarget: 'umd',
        umdNamedDefine: true

    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ]
};