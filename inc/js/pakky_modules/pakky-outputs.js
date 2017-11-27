/**
 * Get outputs
 */

const config = require('../../config');
const path = require('path');

module.exports = {
    path: path.resolve(config('app.output')),
    filename: '[name].min.js'
};
