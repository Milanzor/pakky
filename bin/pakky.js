#!/usr/bin/env node

// Get commandline arguments
const args = require('minimist')(process.argv.slice(2));

const pakkyConsole = require('../inc/pakky-console');

if ('help' in args || 'h' in args || Object.keys(args).length === 1) {

    pakkyConsole.help([
        {
            argument: '--watch',
            description: 'Start watching the app js and scss directories',
        },
        {
            argument: '--build',
            description: 'Build vendors dll, app js and/or app scss files (optional value dll|js|scss',
        },
        {
            argument: '--fonts',
            description: 'Copy all vendor fonts to the config\'d fonts',
        },
        {
            argument: '--pakky-config',
            description: 'Absolute path to config (json) file, will change working directory to that directory',
        },
        {
            argument: '--help',
            description: 'This help menu',
        },
    ]);

    process.exit();
}

pakkyConsole.welcome();

let queue = [];

if ('build' in args) {

    // If we passed multiple --build options, queue them up
    if (typeof args['build'] === 'object') {

        args['build'].forEach(function (buildItem) {
            if (['dll', 'scss', 'app'].indexOf(buildItem) > -1) {
                queue.push(`./build/${buildItem}`);
            }
        });

    } else {

        // If we passed 1 --build, check which it is and queue that
        switch (args['build']) {

            case 'dll':
                queue.push('./build/dll');
                break;
            case 'app':
                queue.push('./build/app');
                break;
            case 'scss':
                queue.push('./build/scss');
                break;
            default:
                queue.push('./build/dll');
                queue.push('./build/app');
                queue.push('./build/scss');
                break;
        }
    }

    pakkyConsole.log(`I'm gonna build these items: ${queue.join(',')}`);


} else if ('watch' in args) {
    queue.push('./watch/app');
    queue.push('./watch/scss');
    pakkyConsole.log(`I'm gonna watch these items: ${queue.join(',')}`);
} else {
    pakkyConsole.log(`Hmm, seems I have nothing to do, did you pass the right arguments?`);
}

// queueProcessor, so we can sync run the queue
let queueProcessor = function (iteration) {

    if (typeof queue[iteration] === 'string') {
        require(queue[iteration])(function () {
            queueProcessor(++iteration);
        });
    }

};

// Launch!
if (queue.length) {
    // Run the first in the queue, then the processor will do the rest
    queueProcessor(0);
}
