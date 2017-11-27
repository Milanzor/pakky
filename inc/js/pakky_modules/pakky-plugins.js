/**
 * Format app chunks
 */

const path = require("path");
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('../../config');
let vendorsOutputPath = path.resolve(config('vendors.output'));

const fs = require('fs');

if (!fs.existsSync(path.join(vendorsOutputPath, 'vendors.dll.json'))) {
    console.log('Vendor dll does not exist, build the dll first!');
    process.exit(1);
}

module.exports = [
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
    new webpack.DllReferencePlugin({
        manifest: require(path.join(vendorsOutputPath, 'vendors.dll.json'))
    })
];
