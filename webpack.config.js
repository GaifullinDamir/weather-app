'use strict'

const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ 
    path: path.resolve(__dirname, '.env')
});

module.exports = {
    entry: './src/js/index.js',
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    plugins: [
        new NodePolyfillPlugin(),
        new webpack.EnvironmentPlugin({
            'DEV_ENV': dotenv.parsed
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        
    ],
}