module.exports = function (cb) {

    /**
     * Pakky SCSS watcher
     */
    const config = require('../../inc/config');

    const path = require('path');

    let watchPath = path.resolve(config('scss.input'));

    let chokidar = require('chokidar');

    let watcher = chokidar.watch(watchPath, {
        ignored: /[\/\\]\./,
        persistent: true
    });


    const pakkyConsole = require('../../inc/pakky-console');

    let scssBuilder = require('../build/scss');

    watcher.on('ready', function () {

        pakkyConsole.log(`Watching scss`);

        watcher
            .on('add ', scssBuilder)
            .on('addDir', scssBuilder)
            .on('change', scssBuilder)
            .on('unlink', scssBuilder)
            .on('unlinkDir', scssBuilder);

        if (typeof cb === 'function') {
            cb();
        }
    });

};
