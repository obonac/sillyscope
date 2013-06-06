#!/usr/bin/env node

var http = require('http');
var shoe = require('shoe');
var spawn = require('child_process').spawn;
var split = require('split');
var fs = require('fs');

var argv = require('optimist').argv;
if (argv._[0] === 'help' || argv.help || argv.h) {
    return fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
}

var range = String(addKilo(argv.range || '0-44000')).split('-').map(Number);
if (!range[0]) range[0] = 0;
if (!range[1]) range[1] = 44000;

if (argv._[0] === 'freqs') {
    var silly = require('../');
    var scope = silly({
        range: range,
        rate: addKilo(argv.rate),
        samples: addKilo(argv.samples)
    });
    
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

function addKilo (s) {
    return s && Number(String(s).replace(/k/g, '000'));
}
