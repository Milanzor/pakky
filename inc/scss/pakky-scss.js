/**
 * Pakky SCSS compiler
 */

// Sass
const nodeSass = require('node-sass');

// Some natives
const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Lodash
const _ = require('lodash');

// Pakky console
const pakkyConsole = require('../pakky-console');

// App config
const config = require('../config');

// Get targetPath from config
let targetPath = path.resolve(config('scss.output'));

module.exports = (() => {

    let self = {};

    self.buildAll = (cb) => {

        self.getSourceFiles(
            // sourcefiles callback
            (scssFiles) => {

                // Loop
                _.forEach(
                    // Through these files
                    scssFiles,

                    // and callback
                    (scssFile) => {
                        let outputFile = self.getTargetFile(scssFile);
                        self.compile(scssFile, outputFile, config('scss.outputStyle'));
                    }
                );

                if (typeof cb === 'function') {
                    cb();
                }
            }
        );
    };

    self.getSourceFiles = (cb) => {
        // Find all css files
        glob(
            // Glob this path
            path.resolve(path.join(config('scss.input'), '**/*.scss')),

            // Glob options
            {
                ignore: ["**/_*",]
            },

            // Glob callback
            (globError, scssFiles) => {
                // If the glob error'd
                if (globError) {

                    //
                    pakkyConsole.log(`Error finding files in`.red);
                    pakkyConsole.error(globError);
                    return false;
                }

                cb(scssFiles);

            });
    };

    self.getTargetFile = (scssFile) => {
        let outputFilename = path.basename(scssFile, path.extname(scssFile)) + '.min.css';
        return path.join(targetPath, outputFilename);
    };

    // Compile function
    self.compile = (scssFile, outputFile, outputStyle) => {

        outputStyle = outputStyle || 'compressed';

        // Render the css
        nodeSass.render(
            // Node-sass options
            {
                file: scssFile,
                outFile: outputFile,
                outputStyle: outputStyle,
                includePaths: config('vendors.module_dirs')
            },

            // Node-sass callback
            (error, result) => {
                //  If sass error'd
                if (error) {
                    pakkyConsole.error('Error compiling ' + scssFile);
                    pakkyConsole.json(error);
                    return false;
                }


                // Write the css to the output file
                fs.writeFile(
                    // FS target
                    outputFile,

                    // content
                    result.css,

                    // FS options
                    {},

                    // FS callback
                    (fileError) => {

                        // if FS writing errored
                        if (fileError) {
                            pakkyConsole.error('Error writing to file');
                            pakkyConsole.error(fileError);
                            return false;
                        }
                    }
                );
            }
        );
    };

    return self;
})();


