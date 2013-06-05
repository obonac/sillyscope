var ndarray = require('ndarray');
var fft = require('ndarray-fft');
var BlockStream = require('block-stream');
var through = require('through');

(function () {
    var floats = new Float64Array(4096);
    var block = new BlockStream(floats.length * 8);
    
    (function next () {
        for (var i = 0; i < floats.length; i++) {
            floats[i] = Math.sin(2 * Math.PI * i / floats.length * 220);
        }
        showFrequencies(floats);
        next();
    })();
    /*
    process.stdin.pipe(block).pipe(through(function (buf) {
        for (var i = 0; i < floats.length; i++) {
            floats[i] = buf.readDoubleLE(i * 8);
        }
        showFrequencies(floats);
    }));
    */
})();

function showFrequencies (floats) {
    var reals = ndarray(floats, [ floats.length, 1 ]);
    var imns = ndarray.zeros([ floats.length, 1 ]);
    
    fft(1, reals, imns);
    
    var active = [];
    for (var i = 0; i < reals.data.length; i++) {
        if (imns.data[i] > 0.001) {
            active.push([ i, imns.data[i] ]);
        }
    }
    console.dir(active);
}
