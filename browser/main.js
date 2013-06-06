var shoe = require('shoe');
var stream = shoe('/sock');
var through = require('through');
var qs = require('querystring');
var params = qs.parse(window.location.search.replace(/^\?/, ''));
var range = params.range && JSON.parse(params.range) || [ 0, 44000 ];

var canvas = document.createElement('canvas');
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

var pos = 0;
stream.pipe(through(function (line) {
    var rows = JSON.parse(line);
    var output = ctx.createImageData(1, canvas.height);
    var dy = canvas.height / Math.log(canvas.height + 1) * Math.log(2)
        * 44000 / (range[1] - range[0])
    ;
    function yOf (n) {
        return Math.floor(dy * Math.log(n + 1) / Math.log(2))
    }
    
    rows.forEach(function (row, i) {
        var x = clamp(row[1]);
        var y = Math.floor(dy * Math.log(i + 1) / Math.log(2)) - yOf(range[0]);
        var y_ = Math.floor(dy * Math.log(i + 2) / Math.log(2)) - yOf(range[0]);
        if (y < 0 || y > canvas.height) return;
        for (var j = y * 4; j <= y_ * 4; j += 4) {
            output.data[j] = output.data[j+1] = output.data[j+2] = x;
            output.data[j+3] = 255;
        }
    });
    
    ctx.putImageData(output, pos++ % canvas.width, 0);
}));

function clamp (x) {
    return Math.floor(Math.min(255, Math.max(0, x)));
}
