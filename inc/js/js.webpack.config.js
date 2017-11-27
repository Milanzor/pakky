/**
 * Pakky JS webpack config
 * TODO: How are we gonna use Appo stuff in our app
 * TODO: Reload when dll changes
 */

// Get chunks, this includes app chunks and lib
let pakkyChunks = require('./pakky_modules/pakky-chunks');
let pakkyPlugins = require('./pakky_modules/pakky-plugins');
let pakkyOutput = require('./pakky_modules/pakky-outputs');
let pakkyResolve = require('./pakky_modules/pakky-resolves');
let pakkyModule = require('./pakky_modules/pakky-modules');

module.exports = {
    cache: false,
    entry: pakkyChunks,
    plugins: pakkyPlugins,
    resolve: pakkyResolve,
    module: pakkyModule,
    output: pakkyOutput
};
