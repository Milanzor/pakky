/**
 * Get resolves
 */

const config = require('../../config');
const path = require('path');
const _ = require('lodash');

module.exports = (function () {

    let modules = [];
    _.each(config('vendors.module_dirs'), function (dir) {
        modules.push(path.resolve(dir))
    });

    // Add pakky node_modules to resolve dirs
    modules.push(path.join(__dirname, '../../../node_modules'));

    return {
        modules: modules,
        alias: config('vendors.aliasses')
    };
})();
