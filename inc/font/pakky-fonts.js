/**
 * Pakky SCSS compiler
 */

// Sass
const glob = require("multi-glob").glob;

// Some natives
const fs = require('fs-extra');
const path = require('path');

// Lodash
const _ = require('lodash');

// Pakky console
const pakkyConsole = require('./pakky-console');

// App config
const config = require('./config');

// Get targetPath from config
let targetPath = path.resolve(config('fonts.output'));

module.exports = (() => {

    let self = {};

    self.getSourceFiles = (cb) => {

        let modulePathGlobs = [];

        _.forEach(config('vendors.module_dirs'), (moduleDir) => {
            _.forEach(['**/*.svg', '**/*.eot', '**/*.ttf', '**/*.woff', '**/*.woff2'], (type) => {
                modulePathGlobs.push(path.join(path.resolve(moduleDir), type));
            });
        });

        // Find all css files
        glob(
            // Glob this path
            modulePathGlobs,

            // Glob callback
            (globError, fontFiles) => {

                // If the glob error'd
                if (globError) {

                    //
                    pakkyConsole.log(`Error finding font files`.red);
                    pakkyConsole.error(globError);
                    return false;
                }

                cb(fontFiles);

            });
    };

    self.getTargetFile = (fontFile) => {
        let outputFilename = path.basename(fontFile);
        return path.join(targetPath, outputFilename);
    };

    self.copyAll = () => {
        self.getSourceFiles((sourceFontFiles) => {
            _.forEach(sourceFontFiles, (sourceFontFile) => {
                let targetFile = self.getTargetFile(sourceFontFile);
                self.copy(sourceFontFile, targetFile);
            });
        });
    };

    self.copy = (source, target) => {
        fs.copySync(source, target);
        pakkyConsole.win(`Copied ${source} to ${target}`);
    };

    return self;
})();


