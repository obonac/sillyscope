var shoe = require('shoe');
var stream = shoe('/sock');
var through = require('through');
var gamma = require('gamma');

var canvas = document.createElement('canvas');
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', 5500);
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

var pos = 0;
stream.pipe(through(function (line) {
    var rows = JSON.parse(line);
    var output = ctx.createImageData(1, canvas.height);
    
    rows.forEach(function (row, i) {
        var x = clamp(gamma(row[1]) / 10);
        var j = i * 4;
        output.data[j] = output.data[j+1] = output.data[j+2] = x;
        output.data[j+3] = 255;
    });
    
    ctx.putImageData(output, pos++ % canvas.width, 0);
}));

function clamp (x) {
    return Math.floor(Math.min(255, Math.max(0, x)));
}
