var ndarray = require('ndarray');
var fft = require('ndarray-fft');
var BlockStream = require('block-stream');
var through = require('through');
var mag = require('ndarray-complex').mag;

exports = module.exports = function (opts) {
    if (!opts) opts = {};
    if (!opts.rate) opts.rate = 44000;
    if (!opts.samples) opts.samples = opts.rate / 8;
    if (!opts.range) opts.range = [ 0, 44000 ];
    
    var floats = new Float32Array(opts.samples);
    var size = floats.BYTES_PER_ELEMENT;
    var block = new BlockStream(floats.length * size);
    
    block.pipe(through(function (buf) {
        for (var i = 0; i < floats.length; i++) {
            floats[i] = buf.readFloatLE(i * size);
        }
        block.emit('frequencies', findFrequencies(floats, opts));
    }));
    return block;
};

function findFrequencies (floats, opts) {
    var reals = ndarray(floats, [ floats.length, 1 ]);
    var imags = ndarray.zeros([ floats.length, 1 ]);
    
    fft(1, reals, imags);
    mag(reals, reals, imags);
    
    var freqs = [];
    for (var i = 0; i < reals.data.length; i++) {
        var freq = i * opts.rate / floats.length;
        if (freq >= opts.range[0] && freq <= opts.range[1]) {
            freqs.push([ freq, reals.data[i] ]);
        }
    }
    return freqs;
}
