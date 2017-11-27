module.exports = function (cb) {
    /**
     * Pakky App JS watcher
     */
    const config = require('../../inc/config');

    const path = require('path');

    let watchPath = path.resolve(config('app.input'));

    let chokidar = require('chokidar');

    let watcher = chokidar.watch(watchPath, {
        ignored: /[\/\\]\./,
        persistent: true
    });

    let appBuilder = require('../build/app');
    const pakkyConsole = require('../../inc/pakky-console');

    watcher.on('ready', function () {

        pakkyConsole.log(`Watching js app`);

        watcher
            .on('add ', appBuilder)
            .on('addDir', appBuilder)
            .on('change', appBuilder)
            .on('unlink', appBuilder)
            .on('unlinkDir', appBuilder);

        if (typeof cb === 'function') {
            cb();
        }
    });

};
