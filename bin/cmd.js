#!/usr/bin/env node

var silly = require('../');
var http = require('http');
var shoe = require('shoe');
var spawn = require('child_process').spawn;
var split = require('split');

var argv = require('optimist').argv;
var range = (argv.range || '0-44000').replace(/k/g, '000').split('-').map(Number);
if (!range[0]) range[0] = 0;
if (!range[1]) range[1] = 44000;

if (argv._[0] === 'freqs') {
    argv.range = range;
    var scope = silly(argv);
    
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
server.listen(0, function () {
    var href = 'http://localhost:' + server.address().port
        + '/?range=' + JSON.stringify(range)
    ;
    spawn('google-chrome', [ '--app=' + href ]);
});

var freqs = spawn(
    process.execPath,
    [ __filename, 'freqs' ].concat(process.argv.slice(2))
);
process.stdin.pipe(freqs.stdin);

var lines = freqs.stdout.pipe(split());

var sock = shoe(function (stream) {
    lines.pipe(stream);
});
sock.install(server, '/sock');
