var baudio = require('baudio');
var b = baudio(function (t) {
    return Math.sin(Math.PI * 2 * t * 220);
});
b.pipe(process.stdout);
//b.play();
