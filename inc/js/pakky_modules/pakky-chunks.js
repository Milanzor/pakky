/**
 * Format app chunks
 */

const config = require('../../config');
const path = require('path');
const glob = require('glob');


module.exports = (function () {

    // Initial top
    let chunks = {};

    // Get all app files
    let appChunks = glob.sync(path.resolve(path.join(config('app.input'), '**/*.js')));

    // Loop through app files and build chunks
    appChunks.forEach(function (appFile) {

        // Build chunkName
        let chunkName = appFile.replace(path.resolve(config('app.input') + '/'), '').replace('.js', '');

        // Push chunks
        chunks[chunkName] = appFile;
    });


    return chunks;
})();
