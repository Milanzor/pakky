module.exports = function (cb) {

    const pakkyScss = require('../../inc/scss/pakky-scss');
    const pakkyConsole = require('../../inc/pakky-console');

    pakkyConsole.log(`Let\'s build all the scss`);

    pakkyScss.buildAll(function () {

        pakkyConsole.win('Finished building scss');

        if (typeof cb === 'function') {
            cb();
        }
    });

};
