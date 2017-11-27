const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Pakky
const pakkyResolve = require('./pakky_modules/pakky-resolves');
const config = require('../config');
let outputPath = path.resolve(config('vendors.output'));

module.exports = {
    node: {
        setImmediate: false
    },
    entry: {
        vendors: config('vendors.list')
    },
    output: {
        filename: '[name].dll.js',
        path: outputPath,
        library: '[name]'
    },
    resolve: pakkyResolve,
    module: {
        noParse: function (content) {
            return /jquery|lodash/.test(content);
        }
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(outputPath, '[name].dll.json')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                beautify: false,
                compress: {
                    ie8: true,
                    warnings: false,
                    drop_console: true
                }
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};
