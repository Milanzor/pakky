let colors = require('colors');
let prettyjson = require('prettyjson');
let packageFile = require('../package');
let _ = require('lodash');
const columnify = require('columnify');

module.exports = {
    prefix: 'Pakky says'.cyan,

    help: function (args) {
        let self = this;

        // Nicely output a welcome
        this.nl();
        this.log(`Hi! I\'m Pakky ${packageFile.version}, nice to meet you, have a look at my command line options.`);
        this.nl();

        // Make nice columns
        let columns = columnify(args, {columns: ['argument', 'description']});
        self.default(columns);

        // Nicely output a goodbye
        this.nl();
        this.log(`Cya later!`);
        this.nl();
    },
    nl: function () {
        console.log('');
    },
    default: function (msg) {
        console.log(msg);
    },
    json: function (obj) {
        this.log(prettyjson.render(obj));
    },
    warn: function (msg) {
        this.log(msg.bgYellow + ''.white);
    },
    error: function (msg) {
        this.log(msg.bgRed + ''.black);
    },
    success: function (msg) {
        this.log(msg.bgGreen + ''.white);
    },
    fail: function (msg) {
        this.log('❌ - ' + msg);
    },
    win: function (msg) {
        this.log('✅ - ' + msg);
    },
    blue: function (msg) {
        this.log(msg.bgCyan + ''.white);
    },
    log: function (msg) {
        console.log(this.getPrefix() + msg);
    },
    getPrefix: function () {
        return this.prefix + ': ';
    },
    welcome: function () {
        this.log(`Hi! I\'m Pakky ${packageFile.version}, nice to meet you.`);
    },
};