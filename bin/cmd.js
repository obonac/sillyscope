#!/usr/bin/env node

var silly = require('../');
var argv = require('optimist').argv;
var http = require('http');
var shoe = require('shoe');
var spawn = require('child_process').spawn;
var split = require('split');

if (argv._[0] === 'freqs') {
    var scope = silly();
    scope.on('frequencies', function (freqs) {
        console.log(JSON.stringify(freqs));
    });
    process.stdin.pipe(scope);
    return;
}

var ecstatic = require('ecstatic')(__dirname + '/../static');
var server = http.createServer(function (req, res) {
    ecstatic(req, res);
});
server.listen(5001);

var freqs = spawn(process.execPath, [ __filename, 'freqs' ]);
process.stdin.pipe(freqs.stdin);

var lines = freqs.stdout.pipe(split());

var sock = shoe(function (stream) {
    lines.pipe(stream);
});
sock.install(server, '/sock');
