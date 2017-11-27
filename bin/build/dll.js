module.exports = function (cb) {
    const webpack = require("webpack");

    const dllWebpackConfig = require('../../inc/js/dll.webpack.config');
    const pakkyConsole = require('../../inc/pakky-console');

    pakkyConsole.log(`Let\'s build the vendor dll`);

    webpack(dllWebpackConfig).run(() => {
        pakkyConsole.win('Finished building dll');
        if (typeof cb === 'function') {
            cb();
        }
    });
};