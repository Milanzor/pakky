/**
 * Config
 */


// FS
const fs = require('fs');

// Path
const path = require('path');

// Commandline arguments
const args = require('minimist')(process.argv.slice(2));

// Lodash
const _ = require('lodash');

module.exports = (function() {



    // Default config locaton
    let configFile = false;

    // If we passed c on the command line
    if ('pakky-config' in args) {
        configFile = args['pakky-config'];
    }

    let loadedConfig = {};

    if (configFile) {

        configFile = path.resolve(configFile);

        // If the config doesnt exist
        if (fs.existsSync(configFile)) {
            // If it does exist, require it
            loadedConfig = require(configFile);
            process.chdir(path.dirname(configFile));
        } else {
            console.log('Seems like the config you provided does not exist, exitting');
            process.exit(1);
        }
    }

    // Get the default config
    let configDefaults = require('./default.config');

    // Combine the loadedConfig with the defaults with lodash
    const config = _.defaults(loadedConfig, configDefaults);

    return function(configPath) {
        return typeof configPath === 'undefined' ? config : _.get(config, configPath, null);
    }
})();
