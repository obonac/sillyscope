#!/usr/bin/env node

var silly = require('../');
var argv = require('optimist').argv;
var scope = silly();

if (argv._[0] === 'freqs') {
    scope.on('frequencies', function (freqs) {
        console.dir(freqs);
    });
}
else {
}

process.stdin.pipe(scope);
