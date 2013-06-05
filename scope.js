var ndarray = require('ndarray');
var fft = require('ndarray-fft');
var BlockStream = require('block-stream');
var through = require('through');

var rate = 44000;

(function () {
    var floats = new Float32Array(8000);
    var size = 4;
    var block = new BlockStream(floats.length * size);
    
    process.stdin.pipe(block).pipe(through(function (buf) {
        for (var i = 0; i < floats.length; i++) {
            floats[i] = buf.readFloatLE(i * size);
        }
        showFrequencies(floats);
    }));
})();

function showFrequencies (floats) {
    var reals = ndarray(floats, [ floats.length, 1 ]);
    var imns = ndarray.zeros([ floats.length, 1 ]);
    
    fft(1, reals, imns);
    
    var active = [];
    for (var i = 0; i < reals.data.length; i++) {
        if (imns.data[i] > 100) {
            var freq = i * rate / floats.length;
            active.push([ freq, imns.data[i] ]);
        }
    }
    console.dir(active);
}
