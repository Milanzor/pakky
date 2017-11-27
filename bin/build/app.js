module.exports = function (cb) {

    const webpack = require("webpack");
    const pakkyConsole = require('../../inc/pakky-console');
    const jsAppWebpackConfig = require('../../inc/js/js.webpack.config');

    pakkyConsole.log(`Let\'s build the app js`);


    webpack(jsAppWebpackConfig).run(() => {

        pakkyConsole.win('Finished building app');

        if (typeof cb === 'function') {
            cb();
        }
    });
};